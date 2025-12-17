import { createClient } from "@/lib/supabase/server";

export async function isFeatureEnabled(key: string): Promise<boolean> {
  const supabase = await createClient();
  
  // Cachear isso seria ideal em produção, mas para agora faremos a query direta
  const { data } = await supabase
    .from('feature_flags')
    .select('is_enabled')
    .eq('key', key)
    .single();

  return data?.is_enabled ?? false; // Se der erro ou não achar, retorna false (seguro)
}