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

  // 1. Buscar o perfil pelo handle (username)
  // Nota: Ajuste os nomes das colunas conforme seu banco real. 
  // Baseado no seu código, a tabela é 'profiles'.
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, full_name, handle, avatar_url, bio, created_at, email') // Adicione outros campos se existirem
    .eq('handle', username)
    .single();

  if (error || !profile) return null;

  // 2. Contar seguidores/seguindo (Mock ou tabela real 'follows')
  // Assumindo uma tabela 'follows' ou 'social_follows'
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

  // 4. Mapear para DTO (Snake Case -> Camel Case)
  const dto: PublicProfileDTO = {
    id: profile.id,
    username: profile.handle || username,
    name: profile.full_name || "Usuário",
    avatarUrl: profile.avatar_url,
    bio: profile.bio,
    location: null, // Adicionar lógica se tiver tabela de endereço
    website: null,
    followersCount: followersCount || 0,
    followingCount: followingCount || 0,
    isFollowing,
    isOwnProfile: viewerId === profile.id,
    createdAt: profile.created_at,
    
    // Privacidade básica: só mostra email se for o próprio dono (ou lógica mais complexa)
    email: (viewerId === profile.id) ? profile.email : null,
  };

  return dto;
});