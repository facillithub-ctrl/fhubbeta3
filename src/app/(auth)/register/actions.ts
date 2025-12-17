'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AUTH_ERRORS } from "@/lib/errors/catalog/auth";
import { ActionResponse } from "@/lib/errors/types";

export async function registerAction(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse> {
  
  const supabase = await createClient();
  
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Persistir dados (menos a senha)
  const formValues = { firstName, lastName, email };

  // 1. Validações Locais
  if (password !== confirmPassword) {
      return { success: false, error: AUTH_ERRORS.PASSWORDS_DO_NOT_MATCH, inputs: formValues };
  }

  if (password.length < 6) {
      return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD_LENGTH, inputs: formValues };
  }

  // 2. Chamada ao Supabase
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

  if (error) {
    console.error("[Register Action]", error);
    
    if (error.code === "user_already_exists" || error.message.includes("already registered")) {
        return { success: false, error: AUTH_ERRORS.EMAIL_ALREADY_IN_USE, inputs: formValues };
    }

    if (error.code === "429") {
        return { success: false, error: AUTH_ERRORS.RATE_LIMIT_EXCEEDED, inputs: formValues };
    }

    if (error.message.includes("Password")) {
        return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD_GENERIC, inputs: formValues };
    }

    return { success: false, error: AUTH_ERRORS.GENERIC_ERROR, inputs: formValues };
  }

  // 3. Sucesso -> Redirect
  if (data.user) {
      redirect("/onboarding"); 
  }
  
  return { success: true };
}