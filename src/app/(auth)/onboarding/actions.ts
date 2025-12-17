'use server'

import { createClient } from "@/lib/supabase/server";
import { OnboardingData, ProfileType } from "@/types/onboarding";
import { AccountRole } from "@/types/account";
import { revalidatePath } from "next/cache";
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

// 1. Action Original de Completar
export async function completeOnboarding(data: OnboardingData): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: { code: 'AUTH', message: "Não autenticado", category: 'AUTH' } };

  let finalAvatarUrl = null;

  // Upload Imagem
  if (data.profileImage && data.profileImage.startsWith('data:image')) {
    try {
        const fileName = `${user.id}-${Date.now()}.png`;
        const buffer = Buffer.from(data.profileImage.split(',')[1], 'base64');
        const { data: uploadData, error: uploadError } = await supabase.storage.from('avatars').upload(fileName, buffer, { contentType: 'image/png', upsert: true });

        if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
            finalAvatarUrl = publicUrl;
        }
    } catch (e) {
        console.error("Upload error", e);
    }
  }

  const accountRole = mapProfileTypeToAccountRole(data.profileTypes[0] || 'individuals');

  const { error: profileError } = await supabase.from('profiles').update({
        handle: data.handle,
        avatar_url: finalAvatarUrl || data.profileImage,
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
        device_settings: { trusted: data.deviceTrusted, notifications: true },
        updated_at: new Date().toISOString()
    }).eq('id', user.id);

  if (profileError) {
      if (profileError.code === '23505') {
           return { success: false, error: { code: 'ONB_001', message: "Handle já existe", category: 'ONBOARDING' } };
      }
      return { success: false, error: { code: 'SYS_001', message: "Erro ao salvar", category: 'SYSTEM' } };
  }

  revalidatePath('/account');
  return { success: true };
}

// 2. NOVA ACTION: Checagem em tempo real
export async function checkHandleAvailability(handle: string): Promise<{ available: boolean; message?: string }> {
    const cleanHandle = handle.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
    
    if (cleanHandle.length < 3) {
        return { available: false, message: "Mínimo de 3 caracteres." };
    }
    
    const reserved = ['admin', 'facillit', 'support', 'root', 'api', 'hub'];
    if (reserved.includes(cleanHandle)) {
        return { available: false, message: "Este termo é reservado." };
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('profiles')
        .select('handle')
        .eq('handle', cleanHandle)
        .single();

    // Se erro for PGRST116, significa que não achou registro, logo está LIVRE
    if (error && error.code === 'PGRST116') {
        return { available: true };
    }

    if (data) {
        return { available: false, message: "Já está em uso." };
    }

    return { available: false, message: "Erro ao verificar." };
}