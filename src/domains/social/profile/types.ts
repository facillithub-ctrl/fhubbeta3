// src/domains/social/profile/types.ts

export type PrivacySettings = {
  showEmail: boolean;
  showEducation: boolean;
  isIndexable: boolean;
};

// DTO Sanitizado para o Frontend (nunca vazar dados sensíveis)
export type PublicProfileDTO = {
  id: string; // User ID
  username: string;
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  
  // Stats
  followersCount: number;
  followingCount: number;
  
  // Estado do visualizador
  isFollowing: boolean; // Se quem vê está seguindo
  isOwnProfile: boolean;

  // Dados condicionais (baseado em privacidade)
  email?: string | null;
  educationData?: any[]; // Tipo placeholder para integração futura
};