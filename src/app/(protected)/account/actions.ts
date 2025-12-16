'use server'

import { createClient } from "@/lib/supabase/server";
import { UserProfile, UserIntelligence, AIPreferences } from "@/types/account";
import { revalidatePath } from "next/cache";

// Adicione este schema se ainda não tiver zod, ou faça validação manual simples
// import { z } from "zod"; 

type ActionResponse = { success: boolean; error?: string };

// [ATUALIZAÇÃO 1] Nova interface para a resposta completa
interface AccountDataResponse {
  user: UserProfile;
  intelligence: UserIntelligence | null;
  privacy: any; // Tipar corretamente se possível (ProfilePrivacy)
}

export async function getAccountData(): Promise<AccountDataResponse> {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Não autenticado");

  // [ATUALIZAÇÃO 2] Buscar Perfil E Privacidade (Left Join)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select(`
      *,
      profile_privacy (*) 
    `)
    .eq('id', user.id)
    .single();

  if (profileError) throw new Error("Erro ao carregar perfil: " + profileError.message);

  const { data: intelligence } = await supabase
    .from('user_intelligence')
    .select('*')
    .eq('profile_id', user.id)
    .maybeSingle();

  // Prepara objeto padrão se não existir no banco
  const privacyData = profile.profile_privacy || {
      is_public: true,
      show_email: false,
      show_location: true,
      show_education: true
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
  // Revalida o perfil público também
  if (formData.username) revalidatePath(`/u/${formData.username}`);
  
  return { success: true };
}

// [ATUALIZAÇÃO 3] Nova Action para salvar privacidade
export async function updatePrivacySettings(settings: any): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: "Não autorizado" };

  // Primeiro pegamos o ID do perfil (caso seja diferente do user.id no seu banco, mas geralmente é igual)
  const { data: profile } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('id', user.id) // Assumindo que profile.id == auth.user.id
      .single();

  if (!profile) return { success: false, error: "Perfil não encontrado" };

  const { error } = await supabase
    .from('profile_privacy')
    .upsert({ 
      profile_id: profile.id,
      is_public: settings.isPublic,
      show_email: settings.showEmail,
      show_location: settings.showLocation,
      show_education: settings.showEducation,
      updated_at: new Date().toISOString()
    }, { onConflict: 'profile_id' });

  if (error) return { success: false, error: error.message };

  revalidatePath('/account');
  revalidatePath(`/u/${profile.username}`);
  return { success: true };
}

export async function updateAiPreferences(preferences: AIPreferences): Promise<ActionResponse> {
  // ... (código existente mantido igual)
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