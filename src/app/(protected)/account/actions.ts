'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { UpdateProfileDTO, ActionResult } from '@/types/account'

// Cliente Admin (ou contexto de servidor)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Atualiza dados públicos do perfil (Tabela profiles)
 */
export async function updateProfileData(userId: string, data: UpdateProfileDTO): Promise<ActionResult> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) throw new Error(error.message)

    revalidatePath('/account')
    return { success: true, message: 'Informações salvas com sucesso.' }
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message }
  }
}

/**
 * Atualiza Configurações de IA
 */
export async function updateAIPreferences(userId: string, aiLevel: string, permissions: any): Promise<ActionResult> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        ai_level: aiLevel,
        // Supondo coluna 'ai_preferences' ou misturando no settings
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) throw new Error(error.message)

    revalidatePath('/account')
    return { success: true, message: 'Preferências de IA atualizadas.' }
  } catch (error) {
    const err = error as Error;
    return { success: false, message: err.message }
  }
}