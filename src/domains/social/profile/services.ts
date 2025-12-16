// src/domains/social/profile/services.ts
import { db } from "@/lib/prisma/client"; // Assumindo instância do Prisma
import { PublicProfileDTO, PrivacySettings } from "./types";
import { cache } from "react";

const DEFAULT_PRIVACY: PrivacySettings = {
  showEmail: false,
  showEducation: true,
  isIndexable: true,
};

// Cacheado por request para evitar múltiplas chamadas na renderização
export const getPublicProfileByUsername = cache(async (
  username: string, 
  viewerId?: string
): Promise<PublicProfileDTO | null> => {
  const user = await db.user.findUnique({
    where: { username },
    include: {
      socialProfile: true,
      _count: {
        select: { followedBy: true, following: true }
      }
    }
  });

  if (!user) return null;

  // Parse Privacy Settings
  const privacy = { 
    ...DEFAULT_PRIVACY, 
    ...(user.socialProfile?.privacySettings as object || {}) 
  };

  // Check Follow Status
  let isFollowing = false;
  if (viewerId) {
    const followCheck = await db.socialFollow.findUnique({
      where: {
        followerId_followingId: {
          followerId: viewerId,
          followingId: user.id
        }
      }
    });
    isFollowing = !!followCheck;
  }

  // Montagem do DTO com filtro de privacidade
  const dto: PublicProfileDTO = {
    id: user.id,
    username: user.username,
    name: user.name,
    avatarUrl: user.image,
    bio: user.socialProfile?.bio || null,
    location: user.socialProfile?.location || null,
    website: user.socialProfile?.website || null,
    followersCount: user._count.followedBy,
    followingCount: user._count.following,
    isFollowing,
    isOwnProfile: viewerId === user.id,
    
    // Campos condicionais
    email: privacy.showEmail ? user.email : null,
    // educationData: privacy.showEducation ? await getEducationSummary(user.id) : null,
  };

  return dto;
});