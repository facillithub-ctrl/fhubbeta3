'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AUTH_ERRORS } from "@/lib/errors/catalog/auth";
import { ActionResponse } from "@/lib/errors/types";

// CORREÇÃO: Adicionado 'prevState' como primeiro argumento
export async function loginAction(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse> {
  
  const supabase = await createClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validação simples
  if (!email || !password) {
      return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[Login] Auth Error:", error.message);
    
    if (error.message.includes("Invalid login credentials")) {
        return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
    }
    
    return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
  }

  // Sucesso
  revalidatePath("/", "layout");
  redirect("/account");
}