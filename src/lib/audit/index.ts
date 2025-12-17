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
  // A PROVA DE FALHAS: 'any' aceita qualquer objeto, impedindo o erro de 'Type mismatch'
  details?: any; 
  userId?: string; 
}

export async function logActivity({ action, details, userId }: LogOptions) {
  try {
    const supabase = await createClient();
    
    let targetUserId = userId;
    // Se não veio userId, tenta pegar da sessão atual
    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        targetUserId = user?.id;
    }

    // Se ainda não tiver usuário, aborta silenciosamente para não quebrar a aplicação
    if (!targetUserId) {
        return;
    }

    // Tenta capturar IP, com fallback seguro
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";

    // Grava no banco
    const { error } = await supabase.from('audit_logs').insert({
        user_id: targetUserId,
        action,
        details,
        ip_address: ip
    });

    if (error) {
        // Loga erro no console do servidor, mas não trava o usuário
        console.error("[Audit] Erro ao salvar log:", error);
    }
  } catch (err) {
    console.error("[Audit] Erro crítico:", err);
  }
}