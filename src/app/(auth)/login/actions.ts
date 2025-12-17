'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AUTH_ERRORS } from "@/lib/errors/catalog/auth";
import { ActionResponse } from "@/lib/errors/types";

export async function loginAction(
  prevState: ActionResponse | null, 
  formData: FormData
): Promise<ActionResponse> {
  
  const supabase = await createClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Persistir email em caso de erro (senha não)
  const formValues = { email };

  if (!email || !password) {
      return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS, inputs: formValues };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[Login] Auth Error:", error.message);
    // Mesmo que o erro seja outro, retornamos credenciais inválidas por segurança,
    // a menos que seja algo de sistema crítico
    return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS, inputs: formValues };
  }

  revalidatePath("/", "layout");
  redirect("/account");
}