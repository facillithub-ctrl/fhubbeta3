
// src/domains/social/profile/services.ts
import { createClient } from "@/lib/supabase/server";
import { PublicProfileDTO } from "./types";
import { cache } from "react";

export const getPublicProfileByUsername = cache(async (
  username: string, 
  viewerId?: string
): Promise<PublicProfileDTO | null> => {
  const supabase = await createClient();

  // [ATUALIZAÇÃO] Adicionado verification_tier no select
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, full_name, handle, avatar_url, bio, created_at, email, verification_tier')
    .eq('handle', username)
    .single();

  if (error || !profile) return null;

  const { data: privacyData } = await supabase
    .from('profile_privacy')
    .select('*')
    .eq('profile_id', profile.id)
    .maybeSingle();

  const { count: followersCount } = await supabase
    .from('social_follows') 
    .select('*', { count: 'exact', head: true })
    .eq('following_id', profile.id);

  const { count: followingCount } = await supabase
    .from('social_follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', profile.id);

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

  const isPublicProfile = privacyData?.is_public ?? true;

  // Lógica de verificação (ajuste conforme os valores do seu ENUM no banco)
  const isVerified = profile.verification_tier && profile.verification_tier !== 'none';

  const dto: PublicProfileDTO = {
    id: profile.id,
    username: profile.handle || username,
    name: profile.full_name || "Usuário",
    avatarUrl: profile.avatar_url,
    bio: profile.bio,
    location: null,
    website: null,
    followersCount: followersCount || 0,
    followingCount: followingCount || 0,
    isFollowing,
    isOwnProfile: viewerId === profile.id,
    createdAt: profile.created_at,
    
    // [NOVO] Mapeamento
    isVerified,

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