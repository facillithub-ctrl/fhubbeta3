'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { UpdateProfileDTO, ActionResult } from '@/types/account'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function updateProfile(userId: string, data: UpdateProfileDTO): Promise<ActionResult> {
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
    return { success: true, message: 'Perfil atualizado com sucesso!' }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}