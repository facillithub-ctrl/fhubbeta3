import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

// Tipos de Ação Permitidos
type AuditAction = 
  | 'USER_REGISTER'
  | 'USER_LOGIN' 
  | 'PROFILE_UPDATE' 
  | 'ONBOARDING_COMPLETE'
  | 'DELETE_ACCOUNT';

// Nova Interface Flexível
interface AuditParams {
  action: AuditAction;
  details?: any; // Aceita qualquer objeto, array ou string. Zero erros de tipo.
  userId?: string; 
}

export async function logActivity({ action, details, userId }: AuditParams) {
  try {
    const supabase = await createClient();
    
    // Resolução de User ID
    let targetUserId = userId;
    if (!targetUserId) {
        const session = await supabase.auth.getUser();
        targetUserId = session.data.user?.id;
    }

    // Aborta se não houver usuário autenticado (segurança)
    if (!targetUserId) return;

    // Captura de IP segura para ambientes serverless
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";

    // Inserção direta
    const { error } = await supabase.from('audit_logs').insert({
        user_id: targetUserId,
        action,
        details: details || {}, // Garante que nunca seja null
        ip_address: ip
    });

    if (error) {
        console.warn("[Audit] Falha silenciosa:", error.message);
    }
  } catch (error) {
    console.warn("[Audit] Falha crítica:", error);
  }
}