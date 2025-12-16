// src/domains/social/profile/types.ts

export type PublicProfileDTO = {
  id: string;
  username: string; // Mapeado de 'handle'
  name: string;     // Mapeado de 'full_name'
  avatarUrl: string | null; // Mapeado de 'avatar_url'
  bio: string | null;
  location: string | null; 
  website: string | null;
  
  // Stats
  followersCount: number;
  followingCount: number;
  
  // Estado do visualizador
  isFollowing: boolean;
  isOwnProfile: boolean;
  
  createdAt: string; 
  
  // [CORREÇÃO] Adicionando campos de privacidade que a página exige
  isPublic: boolean;
  privacy?: {
    showEmail: boolean;
    showLocation: boolean;
    showEducation: boolean;
  };
  
  // Dados sensíveis/condicionais
  email?: string | null;
};