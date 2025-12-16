// src/domains/social/profile/services.ts
import { createClient } from "@/lib/supabase/server";
import { PublicProfileDTO } from "./types";
import { cache } from "react";

// Cacheado para evitar duplicate requests na renderização
export const getPublicProfileByUsername = cache(async (
  username: string, 
  viewerId?: string
): Promise<PublicProfileDTO | null> => {
  const supabase = await createClient();

  // 1. Buscar o perfil pelo handle
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, full_name, handle, avatar_url, bio, created_at, email')
    .eq('handle', username)
    .single();

  if (error || !profile) return null;

  // [CORREÇÃO] 1.5 Buscar configurações de privacidade
  const { data: privacyData } = await supabase
    .from('profile_privacy')
    .select('*')
    .eq('profile_id', profile.id)
    .maybeSingle();

  // 2. Contar seguidores/seguindo
  const { count: followersCount } = await supabase
    .from('social_follows') 
    .select('*', { count: 'exact', head: true })
    .eq('following_id', profile.id);

  const { count: followingCount } = await supabase
    .from('social_follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', profile.id);

  // 3. Verificar se o visualizador segue este perfil
  let isFollowing = false;
  if (viewerId) {
    const { data: followCheck } = await supabase
      .from('social_follows')
      .select('follower_id')
      .eq('follower_id', viewerId)
      .eq('following_id', profile.id)
      .maybeSingle();
    isFollowing = !!followCheck;
  }

  // Define padrão como público se não houver registro de privacidade
  const isPublicProfile = privacyData?.is_public ?? true;

  // 4. Mapear para DTO (Snake Case -> Camel Case)
  const dto: PublicProfileDTO = {
    id: profile.id,
    username: profile.handle || username,
    name: profile.full_name || "Usuário",
    avatarUrl: profile.avatar_url,
    bio: profile.bio,
    location: null, // Pode integrar com tabela de endereços futuramente
    website: null,
    followersCount: followersCount || 0,
    followingCount: followingCount || 0,
    isFollowing,
    isOwnProfile: viewerId === profile.id,
    createdAt: profile.created_at,
    
    // [CORREÇÃO] Preenchendo os novos campos
    isPublic: isPublicProfile,
    privacy: privacyData ? {
        showEmail: privacyData.show_email,
        showLocation: privacyData.show_location,
        showEducation: privacyData.show_education
    } : undefined,
    
    email: (viewerId === profile.id) ? profile.email : null,
  };

  return dto;
});