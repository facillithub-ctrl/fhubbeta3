import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublicProfileByUsername } from "@/domains/social/profile/services";
import { FollowButton } from "@/domains/social/profile/components/follow-button";
import { ProfileShareCardWrapper } from "@/domains/social/profile/components/share-wrapper"; 
import { MapPin, Link as LinkIcon, Mail, GraduationCap } from "lucide-react";
import { Metadata } from "next";

// Tipagem corrigida para Next 15+
interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getPublicProfileByUsername(username);
  if (!profile) return { title: "Perfil não encontrado" };
  return {
    title: `${profile.name} (@${profile.username})`,
    description: profile.bio || `Confira o perfil de ${profile.name} no Facillit Hub.`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const viewerId = user?.id;

  const profile = await getPublicProfileByUsername(username, viewerId);

  // Se o perfil não existe OU é privado e não é o dono visualizando
  if (!profile || (!profile.isPublic && !profile.isOwnProfile)) {
      return notFound();
  }

  return (
    <main className="min-h-screen bg-white pb-20 animate-in fade-in duration-700">
      
      {/* Cover / Header do Perfil Minimalista */}
      <div className="w-full h-64 bg-gray-50 border-b border-gray-100 relative">
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        <div className="relative -mt-20 mb-8 flex flex-col md:flex-row items-end md:items-end gap-6">
           {/* Avatar */}
           <div className="relative group">
             <div className="w-40 h-40 rounded-3xl border-[6px] border-white shadow-lg overflow-hidden bg-white">
                <img 
                  src={profile.avatarUrl || '/assets/images/accont.svg'} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
             </div>
           </div>

           {/* Informações Principais */}
           <div className="flex-1 pb-2 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{profile.name}</h1>
              <p className="text-gray-500 font-medium text-lg">@{profile.username}</p>
           </div>

           {/* Ações (Seguir/Compartilhar) */}
           <div className="flex gap-3 pb-2 w-full md:w-auto">
             {!profile.isOwnProfile && (
               <FollowButton 
                 targetId={profile.id} 
                 initialIsFollowing={profile.isFollowing}
                 isLoggedIn={!!viewerId}
               />
             )}
             <ProfileShareCardWrapper profile={profile} />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* COLUNA ESQUERDA: Bio e Detalhes */}
          <aside className="md:col-span-4 space-y-8">
            
            {/* Bio */}
            {profile.bio && (
              <div className="prose prose-sm text-gray-600 leading-relaxed">
                {profile.bio}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-gray-100">
               <div className="text-center">
                 <span className="block text-xl font-bold text-gray-900">{profile.followersCount}</span>
                 <span className="text-xs text-gray-500 uppercase tracking-wider">Seguidores</span>
               </div>
               <div className="w-px h-8 bg-gray-100" />
               <div className="text-center">
                 <span className="block text-xl font-bold text-gray-900">{profile.followingCount}</span>
                 <span className="text-xs text-gray-500 uppercase tracking-wider">Seguindo</span>
               </div>
            </div>

            {/* Informações Condicionais (Baseado na Privacidade) */}
            <div className="space-y-3 text-sm">
              {profile.location && profile.privacy?.showLocation && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {profile.location}
                </div>
              )}
              
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener" className="flex items-center gap-3 text-gray-600 hover:text-brand-primary transition-colors">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  {profile.website}
                </a>
              )}

              {profile.email && profile.privacy?.showEmail && (
                 <div className="flex items-center gap-3 text-gray-600">
                   <Mail className="w-4 h-4 text-gray-400" />
                   {profile.email}
                 </div>
              )}

               {/* Exemplo de Educação */}
               {profile.privacy?.showEducation && (
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4"/> Educação
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <p className="font-medium text-gray-900">Analista de Sistemas</p>
                        <p className="text-xs text-gray-500">Facillit Education • 2024</p>
                    </div>
                  </div>
               )}
            </div>
          </aside>

          {/* COLUNA DIREITA: Feed / Conteúdo */}
          <section className="md:col-span-8">
             {/* Navegação Interna do Perfil */}
             <div className="flex gap-8 border-b border-gray-100 mb-8">
               <button className="pb-4 border-b-2 border-brand-primary font-medium text-sm text-gray-900">
                 Publicações
               </button>
               <button className="pb-4 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-800 transition-colors">
                 Mídias
               </button>
               <button className="pb-4 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-800 transition-colors">
                 Curtidas
               </button>
             </div>

             {/* Placeholder para Feed Vazio */}
             <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Ainda não há publicações</h3>
                <p className="text-gray-500 max-w-sm">
                   Quando {profile.name} compartilhar novidades ou conquistas, elas aparecerão aqui.
                </p>
             </div>
          </section>

        </div>
      </div>
    </main>
  );
}