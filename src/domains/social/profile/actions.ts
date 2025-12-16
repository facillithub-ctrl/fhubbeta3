// src/domains/social/profile/actions.ts
'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const toggleFollowSchema = z.object({
  targetUserId: z.string().uuid(),
});

export async function toggleFollowAction(input: z.infer<typeof toggleFollowSchema>) {
  const supabase = await createClient();
  
  // 1. Obter usuário autenticado via Supabase
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { error: "Não autorizado", status: 401 };
  }

  const { targetUserId } = toggleFollowSchema.parse(input);

  if (targetUserId === user.id) {
    return { error: "Você não pode seguir a si mesmo", status: 400 };
  }

  try {
    // 2. Verificar se já segue
    const { data: existingFollow } = await supabase
      .from('social_follows')
      .select('*')
      .eq('follower_id', user.id)
      .eq('following_id', targetUserId)
      .maybeSingle();

    if (existingFollow) {
      // Deixar de seguir
      await supabase
        .from('social_follows')
        .delete()
        .eq('follower_id', user.id)
        .eq('following_id', targetUserId);
    } else {
      // Seguir
      await supabase
        .from('social_follows')
        .insert({
          follower_id: user.id,
          following_id: targetUserId
        });
    }

    revalidatePath(`/u`); 
    return { success: true, isFollowing: !existingFollow };
  } catch (error) {
    console.error("Follow Error:", error);
    return { error: "Erro ao processar ação", status: 500 };
  }
}