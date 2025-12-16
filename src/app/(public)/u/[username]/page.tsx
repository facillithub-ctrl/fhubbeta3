// src/app/(public)/u/[username]/page.tsx
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server"; // [CORREÇÃO] Auth via Supabase
import { getPublicProfileByUsername } from "@/domains/social/profile/services";
import { FollowButton } from "@/domains/social/profile/components/follow-button";
import { ProfileShareCardWrapper } from "@/domains/social/profile/components/share-wrapper"; 
import { Metadata } from "next";

interface PageProps {
  params: { username: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const profile = await getPublicProfileByUsername(params.username);
  if (!profile) return { title: "Perfil não encontrado" };
  return {
    title: `${profile.name} (@${profile.username}) | Facillit Hub`,
    description: profile.bio || `Confira o perfil de ${profile.name} no Facillit Hub.`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  // [CORREÇÃO] Recuperação de sessão via Supabase
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const viewerId = user?.id;

  const profile = await getPublicProfileByUsername(params.username, viewerId);

  if (!profile) return notFound();

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20">
      {/* Header Minimalista */}
      <div className="w-full h-48 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100 relative">
        <div className="container mx-auto px-4 h-full flex items-end translate-y-12">
           <div className="relative">
             <img 
               src={profile.avatarUrl || '/assets/images/accont.svg'} 
               alt={profile.name}
               className="w-32 h-32 rounded-2xl border-4 border-white shadow-sm object-cover bg-white"
             />
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 flex flex-col md:flex-row gap-8">
        
        {/* Coluna Esquerda: Info & Ações */}
        <aside className="w-full md:w-1/3 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{profile.name}</h1>
            <p className="text-gray-500 font-medium">@{profile.username}</p>
          </div>

          {profile.bio && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {profile.bio}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">{profile.followersCount}</span>
              <span>Seguidores</span>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">{profile.followingCount}</span>
              <span>Seguindo</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {!profile.isOwnProfile && (
              <FollowButton 
                targetId={profile.id} 
                initialIsFollowing={profile.isFollowing}
                isLoggedIn={!!viewerId}
              />
            )}
            
            <ProfileShareCardWrapper profile={profile} />
          </div>

          {/* Dados de Contato / Privacidade */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            {profile.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {/* Ícones simples se não tiver lucide importado aqui, ou use lucide-react */}
                <span className="text-gray-400">📍</span> {profile.location}
              </div>
            )}
            {profile.email && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-gray-400">✉️</span> {profile.email}
              </div>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener" className="text-sm text-brand-primary hover:underline flex items-center gap-2">
                <span className="text-gray-400">🔗</span> {profile.website}
              </a>
            )}
          </div>
        </aside>

        {/* Coluna Direita: Conteúdo */}
        <section className="flex-1">
           <div className="flex gap-6 border-b border-gray-100 mb-6">
             <button className="pb-3 border-b-2 border-brand-primary font-medium text-sm">Visão Geral</button>
             <button className="pb-3 border-b-2 border-transparent text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">Education</button>
             <button className="pb-3 border-b-2 border-transparent text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">Stories</button>
           </div>

           <div className="bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-200">
             <p className="text-gray-500 text-sm">Nenhuma atividade recente para exibir.</p>
           </div>
        </section>

      </div>
    </main>
  );
}