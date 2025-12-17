'use server'

import { createClient } from "@/lib/supabase/server";
import { OnboardingData, ProfileType } from "@/types/onboarding";
import { AccountRole } from "@/types/account";
import { revalidatePath } from "next/cache";
import { ONBOARDING_ERRORS } from "@/lib/errors/catalog/onboarding";
import { AUTH_ERRORS } from "@/lib/errors/catalog/auth";
import { ActionResponse } from "@/lib/errors/types";

// Helper Mapeamento
const mapProfileTypeToAccountRole = (type: ProfileType): AccountRole => {
    switch (type) {
        case 'education': return 'student';
        case 'schools': return 'institution';
        case 'enterprise': return 'institution';
        case 'startups': return 'institution';
        case 'individuals': return 'individual';
        default: return 'individual';
    }
};

export async function completeOnboarding(data: OnboardingData): Promise<ActionResponse> {
  const supabase = await createClient();
  
  // 1. Validação de Sessão
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
      return { success: false, error: AUTH_ERRORS.SESSION_EXPIRED };
  }

  // 2. Validação Básica de Dados
  if (!data.handle || !data.profileTypes.length) {
      return { success: false, error: ONBOARDING_ERRORS.MISSING_DATA };
  }

  let finalAvatarUrl = null;

  // 3. Upload de Imagem
  if (data.profileImage && data.profileImage.startsWith('data:image')) {
    try {
        const fileExt = 'png'; 
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        // Remove cabeçalho do base64
        const base64Data = data.profileImage.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(fileName, buffer, { contentType: 'image/png', upsert: true });

        if (uploadError) {
            console.error(`[ONB_002] Storage Error:`, uploadError);
            return { success: false, error: ONBOARDING_ERRORS.IMAGE_UPLOAD_FAILED };
        }

        if (uploadData) {
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
            finalAvatarUrl = publicUrl;
        }
    } catch (e) {
        console.error("Erro crítico no upload:", e);
        return { success: false, error: ONBOARDING_ERRORS.IMAGE_UPLOAD_FAILED };
    }
  }

  // 4. Preparação dos Dados
  const mainProfile = data.profileTypes[0] || 'individuals';
  const accountRole = mapProfileTypeToAccountRole(mainProfile);

  // 5. Atualização no Banco
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
        handle: data.handle,
        avatar_url: finalAvatarUrl || data.profileImage, // Usa a nova ou mantém a antiga se for URL
        pronouns: data.pronouns,
        gender: data.gender,
        address: data.address,
        account_type: accountRole,
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
      // Verifica erro de duplicidade (Postgres Error 23505)
      if (profileError.code === '23505') {
          return { success: false, error: ONBOARDING_ERRORS.HANDLE_ALREADY_EXISTS };
      }
      
      console.error(`[ONB_003] DB Error:`, profileError);
      return { success: false, error: ONBOARDING_ERRORS.PROFILE_UPDATE_FAILED };
  }

  revalidatePath('/account');
  return { success: true };
}