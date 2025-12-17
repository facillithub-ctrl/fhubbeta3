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
  // CRÍTICO: 'any' permite salvar o objeto { handle, role, modules } que vem do actions.ts
  details?: Record<string, any>; 
  userId?: string; 
}

export async function logActivity({ action, details, userId }: LogOptions) {
  try {
    const supabase = await createClient();
    
    let targetUserId = userId;
    // Se não vier userId, tenta pegar da sessão
    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        targetUserId = user?.id;
    }

    // Se não tiver usuário (ex: erro de login), aborta o log para não quebrar o banco
    if (!targetUserId) {
        return;
    }

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";

    const { error } = await supabase.from('audit_logs').insert({
        user_id: targetUserId,
        action,
        details, // Agora aceita o objeto graças ao tipo 'any'
        ip_address: ip
    });

    if (error) {
        console.error("[Audit] Erro ao salvar log:", error);
    }
  } catch (err) {
    console.error("[Audit] Erro crítico:", err);
  }
}