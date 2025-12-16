'use server'

import { createClient } from "@/lib/supabase/server";
import { UserProfile, UserIntelligence, AIPreferences } from "@/types/account";
import { revalidatePath } from "next/cache";

// Tipo de retorno explícito
interface AccountDataResponse {
  user: UserProfile;
  intelligence: UserIntelligence | null;
}

export async function getAccountData(): Promise<AccountDataResponse> {
  const supabase = createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Não autenticado");

  // Tipagem do retorno do banco
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) throw new Error("Erro ao carregar perfil");

  const { data: intelligence } = await supabase
    .from('user_intelligence')
    .select('*')
    .eq('profile_id', user.id)
    .single();

  // Cast seguro pois o banco deve bater com a interface
  return {
    user: profile as UserProfile,
    intelligence: intelligence as UserIntelligence | null
  };
}

export async function updateProfile(formData: Partial<UserProfile>): Promise<{ success: boolean }> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const { error } = await supabase
    .from('profiles')
    .update({
      ...formData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) throw new Error(`Erro ao atualizar: ${error.message}`);
  
  revalidatePath('/account');
  return { success: true };
}

export async function updateAiPreferences(preferences: AIPreferences): Promise<void> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autorizado");

  const { error } = await supabase
    .from('profiles')
    .update({
      ai_preferences: preferences,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) throw error;
  revalidatePath('/account');
}