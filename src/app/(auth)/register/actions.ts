'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { AUTH_ERRORS } from "@/lib/errors/catalog/auth";
import { ActionResponse } from "@/lib/errors/types";

// CORREÇÃO: Adicionado 'prevState' como primeiro argumento
export async function registerAction(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse> {
  
  const supabase = await createClient();
  
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // const confirmPassword = formData.get("confirmPassword") as string; // Se estiver usando

  if (password.length < 6) {
      return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
            full_name: `${firstName} ${lastName}`.trim(),
        },
        // emailRedirectTo: ...
    }
  });

  if (error) {
    console.error("[Register] Error:", error);
    
    if (error.message.includes("User already registered") || error.code === "user_already_exists") {
        return { success: false, error: AUTH_ERRORS.EMAIL_ALREADY_IN_USE };
    }

    if (error.message.includes("Password")) {
        return { success: false, error: AUTH_ERRORS.WEAK_PASSWORD };
    }

    return { 
        success: false, 
        error: { ...AUTH_ERRORS.INVALID_CREDENTIALS, message: "Erro ao criar conta. Tente novamente." } 
    };
  }
  
  return { success: true };
}