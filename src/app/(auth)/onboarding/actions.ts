'use server'

import { createClient } from "@/lib/supabase/server";
import { OnboardingData, ProfileType } from "@/types/onboarding";
import { AccountRole } from "@/types/account";
import { revalidatePath } from "next/cache";

// Função Helper para Mapear Enum
const mapProfileTypeToAccountRole = (type: ProfileType): AccountRole => {
    switch (type) {
        case 'education': return 'student';
        case 'schools': return 'institution';
        case 'enterprise': return 'institution';
        case 'startups': return 'institution'; // ou 'individual' dependendo da regra
        case 'individuals': return 'individual';
        default: return 'individual';
    }
};

export async function completeOnboarding(data: OnboardingData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Usuário não autenticado." };

  let finalAvatarUrl = null;

  // 1. Upload de Imagem
  if (data.profileImage && data.profileImage.startsWith('data:image')) {
    try {
        const fileExt = 'png'; 
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const base64Data = data.profileImage.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(fileName, buffer, {
                contentType: 'image/png',
                upsert: true
            });

        if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
            finalAvatarUrl = publicUrl;
        }
    } catch (e) {
        console.error("Erro no upload de imagem:", e);
    }
  }

  // 2. Mapeamento Correto do Role
  // Pegamos o primeiro perfil escolhido como principal para definir a role da conta
  const mainProfile = data.profileTypes[0] || 'individuals';
  const accountRole = mapProfileTypeToAccountRole(mainProfile);

  // 3. Atualizar Perfil
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
        handle: data.handle,
        avatar_url: finalAvatarUrl || data.profileImage,
        pronouns: data.pronouns,
        gender: data.gender,
        // Se 'sexuality' não existir no banco, adicione-o apenas se tiver certeza
        // Caso contrário, coloque em um campo JSONB de metadados se existir, ou ignore
        // Vou assumir que 'sexuality' não existe na tabela profiles baseada no PDF,
        // então não estou enviando para evitar erro. Se existir, descomente abaixo:
        // sexuality: data.sexuality, 
        
        address: data.address,
        account_type: accountRole, // AQUI ESTAVA O ERRO, AGORA ESTÁ MAPEADO
        onboarding_completed: true,
        ai_level: data.aiLevel,
        ai_preferences: {
            data_sharing: data.permissions.dataAnalysis,
            personalization: data.permissions.recommendations,
            autonomy_level: data.aiLevel
        },
        device_settings: {
            trusted: data.deviceTrusted,
            notifications: true
        },
        updated_at: new Date().toISOString()
    })
    .eq('id', user.id);

  if (profileError) {
      console.error("Erro ao salvar perfil:", profileError);
      return { success: false, error: profileError.message };
  }

  revalidatePath('/account');
  return { success: true };
}