'use server'

import { createClient } from "@/lib/supabase/server";
import { UserProfile, UserIntelligence, AIPreferences } from "@/types/account";
import { revalidatePath } from "next/cache";

interface AccountDataResponse {
  user: UserProfile;
  intelligence: UserIntelligence | null;
}

export async function getAccountData(): Promise<AccountDataResponse> {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Não autenticado");

  // Busca Perfil
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) throw new Error("Erro ao carregar perfil: " + profileError.message);

  // Busca Inteligência (Pode ser nulo)
  const { data: intelligence } = await supabase
    .from('user_intelligence')
    .select('*')
    .eq('profile_id', user.id)
    .maybeSingle(); // maybeSingle evita erro se não existir

  return {
    user: { ...profile, email: user.email! } as UserProfile, // Injeta o email do auth
    intelligence: intelligence as UserIntelligence | null
  };
}

export async function updateProfile(formData: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autorizado" };

  // Remove email dos dados a serem atualizados (email é gerido pelo auth)
  const { email, ...updates } = formData;

  const { error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) return { success: false, error: error.message };
  
  revalidatePath('/account');
  return { success: true };
}

export async function updateAiPreferences(preferences: AIPreferences): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autorizado" };

  const { error } = await supabase
    .from('profiles')
    .update({
      ai_preferences: preferences,
      ai_level: preferences.autonomy_level, // Sincroniza nível
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) return { success: false, error: error.message };
  
  revalidatePath('/account');
  return { success: true };
}