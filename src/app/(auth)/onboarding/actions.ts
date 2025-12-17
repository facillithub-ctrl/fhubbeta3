'use server'

import { createClient } from "@/lib/supabase/server";
import { OnboardingData, ProfileType } from "@/types/onboarding";
import { AccountRole } from "@/types/account";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/lib/errors/types";
import { logActivity } from "@/lib/audit";

// --- HELPERS ---

// Mapeia o tipo de perfil selecionado para a role do sistema (RBAC)
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

// --- ACTIONS ---

/**
 * Finaliza o processo de onboarding, salva o perfil e define a role.
 */
export async function completeOnboarding(data: OnboardingData): Promise<ActionResponse> {
  const supabase = await createClient();
  
  // Verifica autenticação
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
      return { 
          success: false, 
          error: { code: 'AUTH_001', message: "Usuário não autenticado", category: 'AUTH' } 
      };
  }

  let finalAvatarUrl = null;

  // 1. UPLOAD DE IMAGEM (Se houver nova imagem em base64)
  if (data.profileImage && data.profileImage.startsWith('data:image')) {
    try {
        const fileExt = 'png'; 
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        // Converte base64 para Buffer
        const base64Data = data.profileImage.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');

        const { data: uploadData, error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(fileName, buffer, {
                contentType: 'image/png',
                upsert: true
            });

        if (uploadError) {
             console.error("[Onboarding] Erro upload imagem:", uploadError);
             // Não retornamos erro fatal aqui para não bloquear o cadastro por causa da foto
        }

        if (uploadData) {
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
            finalAvatarUrl = publicUrl;
        }
    } catch (e) {
        console.error("[Onboarding] Exceção upload imagem:", e);
    }
  }

  // 2. PREPARAÇÃO DOS DADOS
  const mainProfile = data.profileTypes[0] || 'individuals';
  const accountRole = mapProfileTypeToAccountRole(mainProfile);

  // 3. ATUALIZAÇÃO DO PERFIL NO BANCO
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
        handle: data.handle,
        avatar_url: finalAvatarUrl || data.profileImage, // Usa a nova URL ou mantém a antiga se já for URL
        pronouns: data.pronouns,
        gender: data.gender,
        // sexuality: data.sexuality, // Descomente se tiver coluna no banco
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
      console.error("[Onboarding] Erro DB:", profileError);

      // Erro de chave única (handle duplicado)
      if (profileError.code === '23505') {
           return { 
               success: false, 
               error: { 
                   code: 'ONB_001', 
                   message: "Este @handle já foi escolhido por outro usuário.", 
                   category: 'ONBOARDING' 
               } 
           };
      }
      
      return { 
          success: false, 
          error: { 
              code: 'SYS_DB_ERR', 
              message: "Erro ao salvar perfil. Tente novamente.", 
              techDescription: profileError.message,
              category: 'DATABASE' 
          } 
      };
  }

  // 4. LOG DE AUDITORIA (Sucesso)
  await logActivity({
      action: 'ONBOARDING_COMPLETE',
      userId: user.id,
      details: { 
          handle: data.handle,
          role: accountRole,
          modules: data.selectedModules,
          ai_level: data.aiLevel
      }
  });

  revalidatePath('/account');
  return { success: true };
}

/**
 * Verifica se um @handle está disponível em tempo real.
 * Usado pelo componente StepIdentity via debounce.
 */
export async function checkHandleAvailability(handle: string): Promise<{ available: boolean; message?: string }> {
    // Normalização
    const cleanHandle = handle.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
    
    // Validações básicas
    if (cleanHandle.length < 3) {
        return { available: false, message: "Mínimo de 3 caracteres." };
    }
    
    // Lista negra de palavras reservadas
    const reserved = ['admin', 'facillit', 'support', 'root', 'api', 'hub', 'system', 'dashboard'];
    if (reserved.includes(cleanHandle)) {
        return { available: false, message: "Este termo é reservado pelo sistema." };
    }

    const supabase = await createClient();
    
    // Busca no banco
    const { data, error } = await supabase
        .from('profiles')
        .select('handle')
        .eq('handle', cleanHandle)
        .single();

    // Se der erro PGRST116 (Row not found), significa que NINGUÉM tem esse handle.
    // Logo, está DISPONÍVEL.
    if (error && error.code === 'PGRST116') {
        return { available: true };
    }

    // Se encontrou dados, já existe.
    if (data) {
        return { available: false, message: "Este @handle já está em uso." };
    }

    // Erro genérico
    return { available: false, message: "Erro ao verificar disponibilidade." };
}