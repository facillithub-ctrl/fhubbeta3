// src/domains/social/profile/types.ts
import { VerificationTier } from "@/shared/ui/verification-badge";

export type PublicProfileDTO = {
  id: string;
  username: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null; 
  website: string | null;
  
  followersCount: number;
  followingCount: number;
  
  isFollowing: boolean;
  isOwnProfile: boolean;
  
  // [MUDANÇA] Usando o tipo correto para saber a cor
  verificationTier: VerificationTier;
  
  createdAt: string; 
  
  isPublic: boolean;
  privacy?: {
    showEmail: boolean;
    showLocation: boolean;
    showEducation: boolean;
  };
  
  email?: string | null;
};