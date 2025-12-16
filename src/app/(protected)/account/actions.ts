'use server'

import { createClient } from "@/lib/supabase/server";
import { UserProfile, UserIntelligence, AIPreferences } from "@/types/account";
import { revalidatePath } from "next/cache";

// Tipo de retorno padronizado
type ActionResponse = { success: boolean; error?: string };

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
    .maybeSingle();

  return {
    user: { ...profile, email: user.email! } as UserProfile,
    intelligence: intelligence as UserIntelligence | null
  };
}

export async function updateProfile(formData: Partial<UserProfile>): Promise<ActionResponse> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Não autorizado" };

  // Removemos campos sensíveis ou geridos pelo auth
  const { email, id, created_at, ...updates } = formData;

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