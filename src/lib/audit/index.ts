import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

type AuditAction = 
  | 'USER_REGISTER'
  | 'USER_LOGIN' 
  | 'PROFILE_UPDATE' 
  | 'ONBOARDING_COMPLETE'
  | 'DELETE_ACCOUNT';

interface LogOptions {
  action: AuditAction;
  // CORREÇÃO: 'unknown' aceita qualquer objeto JSON, resolvendo o erro de tipo
  details?: Record<string, unknown>; 
  userId?: string; 
}

export async function logActivity({ action, details, userId }: LogOptions) {
  try {
    const supabase = await createClient();
    
    let targetUserId = userId;
    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        targetUserId = user?.id;
    }

    if (!targetUserId) {
        return;
    }

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";

    const { error } = await supabase.from('audit_logs').insert({
        user_id: targetUserId,
        action,
        details,
        ip_address: ip
    });

    if (error) {
        console.error("[Audit] Erro ao salvar log:", error);
    }
  } catch (err) {
    console.error("[Audit] Erro crítico:", err);
  }
}