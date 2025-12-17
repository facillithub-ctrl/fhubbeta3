'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AUTH_ERRORS } from "@/lib/errors/catalog/auth";
import { ActionResponse } from "@/lib/errors/types";
import { logActivity } from "@/lib/audit";
import { isFeatureEnabled } from "@/lib/features";

export async function registerAction(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse> {
  
  // 1. CHECAGEM DE SEGURANÇA (FEATURE FLAG)
  // Se a flag estiver desativada no banco, bloqueia o cadastro imediatamente.
  const registrationEnabled = await isFeatureEnabled('ENABLE_REGISTRATION');
  
  if (!registrationEnabled) {
      return { 
          success: false, 
          error: { 
              code: 'SYS_MAINTENANCE', 
              message: 'Novos cadastros estão temporariamente suspensos para manutenção.', 
              techDescription: 'Feature flag ENABLE_REGISTRATION is false.',
              category: 'SYSTEM' 
          } 
      };
  }

  const supabase = await createClient();
  
  // Extração dos dados do formulário
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Objeto para persistir os dados no front (menos senha)
  const formValues = { firstName, lastName, email };

  // 2. VALIDAÇÕES LOCAIS (Fail Fast)
  if (password !== confirmPassword) {
      return { success: false, error: AUTH_ERRORS.PASSWORDS_DO_NOT_MATCH, inputs: formValues };
  }

  if (password.length < 6) {
      return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD_LENGTH, inputs: formValues };
  }

  // 3. CHAMADA AO SUPABASE AUTH
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            full_name: `${firstName} ${lastName}`.trim(),
            onboarding_completed: false 
        },
    }
  });

  // 4. TRATAMENTO DE ERROS
  if (error) {
    console.error("[Register Action Error]", error);
    
    // Erro de usuário já existente
    if (error.code === "user_already_exists" || error.message.includes("already registered")) {
        return { success: false, error: AUTH_ERRORS.EMAIL_ALREADY_IN_USE, inputs: formValues };
    }

    // Erro de limite de requisições
    if (error.code === "429" || error.message.includes("rate limit")) {
        return { success: false, error: AUTH_ERRORS.RATE_LIMIT_EXCEEDED, inputs: formValues };
    }

    // Erro de senha fraca (rejeitada pelo Supabase)
    if (error.message.includes("Password")) {
        return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD_GENERIC, inputs: formValues };
    }

    // Erro genérico de sistema
    return { success: false, error: AUTH_ERRORS.GENERIC_ERROR, inputs: formValues };
  }

  // 5. SUCESSO E LOG DE AUDITORIA
if (data.user) {
      // Registra que um novo usuário foi criado
      await logActivity({
          action: 'USER_REGISTER',
          userId: data.user.id,
          details: { 
              email, 
              method: 'email_password',
              name: `${firstName} ${lastName}`
          } as Record<string, unknown> // Casting seguro
      });

      redirect("/onboarding"); 
  }
  
  // Fallback de segurança
  return { success: true };
}