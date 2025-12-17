// src/domains/social/profile/types.ts

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
  
  // [NOVO] Campo para controlar o selo
  isVerified: boolean;
  
  createdAt: string; 
  
  isPublic: boolean;
  privacy?: {
    showEmail: boolean;
    showLocation: boolean;
    showEducation: boolean;
  };
  
  email?: string | null;
};