'use server'

import { createClient } from "@/lib/supabase/server";
import { UserProfile, UserIntelligence, AIPreferences } from "@/types/account";
import { revalidatePath } from "next/cache";

type ActionResponse = { success: boolean; error?: string };

interface AccountDataResponse {
  user: UserProfile;
  intelligence: UserIntelligence | null;
  privacy: any; 
}

export async function getAccountData(): Promise<AccountDataResponse> {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Não autenticado");

  // Buscar Perfil E Privacidade
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
  
  // [CORREÇÃO] Usar 'handle' em vez de 'username'
  if (formData.handle) {
    revalidatePath(`/u/${formData.handle}`);
  }
  
  return { success: true };
}

export async function updatePrivacySettings(settings: any): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: "Não autorizado" };

  // [CORREÇÃO] Selecionar 'handle' em vez de 'username'
  const { data: profile } = await supabase
      .from('profiles')
      .select('id, handle')
      .eq('id', user.id)
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
  // [CORREÇÃO] Usar 'handle' para revalidar a rota pública
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