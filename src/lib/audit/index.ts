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
  details?: Record<string, any>; // CORREÇÃO: Alterado de 'null' para 'any' para aceitar qualquer dado
  userId?: string; // Opcional se já estiver logado
}

export async function logActivity({ action, details, userId }: LogOptions) {
  try {
    const supabase = await createClient();
    
    // Se não passar userId, tenta pegar da sessão
    let targetUserId = userId;
    if (!targetUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        targetUserId = user?.id;
    }

    if (!targetUserId) {
        console.warn(`[Audit] Tentativa de log sem usuário: ${action}`);
        return;
    }

    // Tenta pegar o IP (funciona no Vercel/Next.js)
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";

    // Grava no banco de forma "fire and forget" (não bloqueia o usuário se falhar)
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