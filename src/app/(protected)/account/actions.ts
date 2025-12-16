'use server'

import { createClient } from "@/lib/supabase/server";
import { UserProfile, UserIntelligence, AIPreferences, ProfilePrivacySettings } from "@/types/account";
import { revalidatePath } from "next/cache";

type ActionResponse = { success: boolean; error?: string };

interface AccountDataResponse {
  user: UserProfile;
  intelligence: UserIntelligence | null;
  privacy: ProfilePrivacySettings; 
}

export async function getAccountData(): Promise<AccountDataResponse> {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Não autenticado");

  // 1. Busca APENAS o Perfil (sem o join que estava quebrando)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*') // Removemos 'profile_privacy (*)' daqui
    .eq('id', user.id)
    .single();

  if (profileError) throw new Error("Erro ao carregar perfil: " + profileError.message);

  // 2. Busca a Privacidade SEPARADAMENTE usando o ID do perfil
  const { data: privacyDataRaw } = await supabase
    .from('profile_privacy')
    .select('*')
    .eq('profile_id', profile.id)
    .maybeSingle();

  // 3. Busca a Inteligência
  const { data: intelligence } = await supabase
    .from('user_intelligence')
    .select('*')
    .eq('profile_id', user.id)
    .maybeSingle();

  // Mapeamento manual dos dados de privacidade (snake_case -> camelCase)
  // Se não existir registro no banco, usa os valores padrão
  const privacyData: ProfilePrivacySettings = privacyDataRaw ? {
      isPublic: privacyDataRaw.is_public,
      showEmail: privacyDataRaw.show_email,
      showLocation: privacyDataRaw.show_location,
      showEducation: privacyDataRaw.show_education,
      allowMessages: privacyDataRaw.allow_messages ?? true
  } : {
      isPublic: true,
      showEmail: false,
      showLocation: true,
      showEducation: true,
      allowMessages: true
  };

  return {
    user: { ...profile, email: user.email! } as UserProfile,
    intelligence: intelligence as UserIntelligence | null,
    privacy: privacyData
  };
}

export async function updateProfile(formData: Partial<UserProfile>): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const { email, id, created_at, ...updates } = formData;

  const { error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) return { success: false, error: error.message };
  
  revalidatePath('/account');
  
  if (formData.handle) {
    revalidatePath(`/u/${formData.handle}`);
  }
  
  return { success: true };
}

export async function updatePrivacySettings(settings: ProfilePrivacySettings): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: "Não autorizado" };

  // Busca o ID do perfil primeiro
  const { data: profile } = await supabase
      .from('profiles')
      .select('id, handle')
      .eq('id', user.id)
      .single();

  if (!profile) return { success: false, error: "Perfil não encontrado" };

  // Atualiza ou Cria (Upsert) na tabela de privacidade
  const { error } = await supabase
    .from('profile_privacy')
    .upsert({ 
      profile_id: profile.id,
      is_public: settings.isPublic,
      show_email: settings.showEmail,
      show_location: settings.showLocation,
      show_education: settings.showEducation,
      allow_messages: settings.allowMessages,
      updated_at: new Date().toISOString()
    }, { onConflict: 'profile_id' });

  if (error) return { success: false, error: error.message };

  revalidatePath('/account');
  if (profile.handle) {
      revalidatePath(`/u/${profile.handle}`);
  }
  
  return { success: true };
}

export async function updateAiPreferences(preferences: AIPreferences): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const { error } = await supabase
    .from('profiles')
    .update({
      ai_preferences: preferences,
      ai_level: preferences.autonomy_level,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) return { success: false, error: error.message };
  
  revalidatePath('/account');
  return { success: true };
}