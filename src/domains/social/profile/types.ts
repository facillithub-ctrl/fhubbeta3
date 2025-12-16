// src/domains/social/profile/types.ts

export type PublicProfileDTO = {
  id: string;
  username: string; // Mapeado de 'handle'
  name: string;     // Mapeado de 'full_name'
  avatarUrl: string | null; // Mapeado de 'avatar_url'
  bio: string | null;
  location: string | null; // Assumindo que existe no address ou similar
  website: string | null;
  
  // Stats
  followersCount: number;
  followingCount: number;
  
  // Estado do visualizador
  isFollowing: boolean;
  isOwnProfile: boolean;
  
  createdAt: string; // Data em string ISO para serialização
  
  // Dados sensíveis/condicionais
  email?: string | null;
};