// src/domains/social/profile/actions.ts
'use server'

import { auth } from "@/core/auth"; // Assumindo Auth.js
import { db } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const toggleFollowSchema = z.object({
  targetUserId: z.string().uuid(),
});

export async function toggleFollowAction(input: z.infer<typeof toggleFollowSchema>) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Não autorizado", status: 401 };
  }

  const { targetUserId } = toggleFollowSchema.parse(input);

  if (targetUserId === session.user.id) {
    return { error: "Você não pode seguir a si mesmo", status: 400 };
  }

  try {
    const existingFollow = await db.socialFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId
        }
      }
    });

    if (existingFollow) {
      await db.socialFollow.delete({
        where: {
          followerId_followingId: {
            followerId: session.user.id,
            followingId: targetUserId
          }
        }
      });
    } else {
      await db.socialFollow.create({
        data: {
          followerId: session.user.id,
          followingId: targetUserId
        }
      });
    }

    revalidatePath(`/u`); // Revalida rotas públicas
    return { success: true, isFollowing: !existingFollow };
  } catch (error) {
    console.error("Follow Error:", error);
    return { error: "Erro ao processar ação", status: 500 };
  }
}

const updatePrivacySchema = z.object({
  showEmail: z.boolean(),
  showEducation: z.boolean(),
});

export async function updatePrivacySettings(input: z.infer<typeof updatePrivacySchema>) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const validData = updatePrivacySchema.parse(input);

  await db.socialProfile.upsert({
    where: { userId: session.user.id },
    create: {
      userId: session.user.id,
      privacySettings: validData,
    },
    update: {
      privacySettings: validData, // O Postgres faz o merge ou replace dependendo da config, aqui substitui
    }
  });

  revalidatePath(`/u`);
  return { success: true };
}