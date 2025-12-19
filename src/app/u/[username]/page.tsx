import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { 
    MapPin, Calendar, Link as LinkIcon, Briefcase, 
    GraduationCap, CheckCircle2, Share2, Shield, AlertCircle 
} from "lucide-react";
import { Button } from "@/shared/ui/button";

// CORREÇÃO: Importação Padrão (sem chaves)
import ShareWrapper from "@/domains/social/profile/components/share-wrapper";
import { FollowButton } from "@/domains/social/profile/components/follow-button";
import { cn } from "@/shared/utils/cn";

// ... (Restante do código generateMetadata e PublicProfilePage permanece o mesmo do meu envio anterior)
// ... Certifique-se de que o uso do <ShareWrapper> dentro do JSX continua igual:
// <ShareWrapper profile={profile}> ... </ShareWrapper>

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase.from('profiles').select('first_name, last_name, bio').eq('handle', username).single();

  if (!profile) return { title: 'Perfil não encontrado' };

  return {
    title: `${profile.first_name} ${profile.last_name} (@${username})`,
    description: profile.bio || `Confira o perfil de ${profile.first_name} no Facillit Hub.`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('handle', username)
    .single();

  if (!profile) notFound();

  const { data: privacy } = await supabase
    .from('profile_privacy')
    .select('*')
    .eq('profile_id', profile.id)
    .maybeSingle();

  const { data: { user: currentUser } } = await supabase.auth.getUser();
  const isMe = currentUser?.id === profile.id;
  const isPublic = privacy ? privacy.is_public : true;

  if (!isPublic && !isMe) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground animate-in fade-in">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                <Shield className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Perfil Privado</h1>
            <p className="text-muted-foreground max-w-md text-center">
                Este usuário optou por manter suas informações restritas.
            </p>
        </div>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 overflow-x-hidden">
      <div className="h-64 md:h-80 w-full relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 animate-gradient-xy"></div>
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-30 -mt-32">
        <div className="bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center mx-auto md:mx-0 -mt-20 md:-mt-24">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] border-4 border-background bg-muted shadow-2xl overflow-hidden relative group transition-transform hover:scale-105 duration-500">
                        {profile.avatar_url ? (
                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-5xl font-bold text-muted-foreground">
                                {profile.first_name?.[0]}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex gap-2 flex-wrap justify-center">
                         <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold border border-blue-500/20 flex items-center gap-1 uppercase tracking-wider shadow-sm">
                            <CheckCircle2 className="w-3 h-3" /> Verificado
                         </span>
                         {isMe && (
                             <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-wider shadow-sm">
                                Você
                             </span>
                         )}
                    </div>
                </div>

                <div className="flex-1 space-y-5 text-center md:text-left pt-2">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-1">
                            {profile.first_name} {profile.last_name}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
                            @{profile.handle}
                        </p>
                    </div>

                    {profile.bio && (
                        <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl font-light">
                            {profile.bio}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                        {(privacy?.show_location ?? true) && (
                            <InfoPill icon={MapPin} text="São Paulo, BR" /> 
                        )}
                        <InfoPill icon={Calendar} text="Membro desde 2024" />
                        {(privacy?.show_education ?? true) && (
                             <InfoPill icon={GraduationCap} text="Facillit University" />
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto pt-4 md:pt-0">
                     <ShareWrapper profile={profile}>
                        <Button variant="outline" className="w-full md:w-auto gap-2 rounded-xl h-12 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
                            <Share2 className="w-4 h-4" /> 
                            <span className="md:hidden lg:inline">Compartilhar</span>
                        </Button>
                     </ShareWrapper>
                     
                     {!isMe && (
                         <FollowButton targetUserId={profile.id} className="w-full md:w-auto h-12 rounded-xl shadow-lg shadow-primary/20" />
                     )}
                     
                     {isMe && (
                         <Button className="w-full md:w-auto h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                            Editar Perfil
                         </Button>
                     )}
                </div>
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground text-lg mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Carreira & Skills
                </h3>
                <div className="space-y-4">
                    <SkillRow label="Ocupação" value="Product Designer" />
                    <SkillRow label="Empresa" value="Facillit Inc." />
                    <div className="pt-4 flex flex-wrap gap-2">
                        {["React", "Design", "Leadership"].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-muted rounded-lg text-xs font-medium text-muted-foreground">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 bg-card border border-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground text-lg mb-6 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-primary" />
                    Hubs Ativos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <HubCard 
                        title="Portfólio Acadêmico" 
                        desc="Certificados e projetos de estudo." 
                        color="bg-purple-500" 
                        icon={GraduationCap} 
                    />
                    <HubCard 
                        title="Projetos Startup" 
                        desc="Meus empreendimentos atuais." 
                        color="bg-pink-500" 
                        icon={AlertCircle} 
                    />
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

function InfoPill({ icon: Icon, text }: any) {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors cursor-default">
            <Icon className="w-3.5 h-3.5" />
            <span>{text}</span>
        </div>
    )
}

function SkillRow({ label, value }: any) {
    return (
        <div className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold text-foreground">{value}</span>
        </div>
    )
}

function HubCard({ title, desc, color, icon: Icon }: any) {
    return (
        <a href="#" className="group flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/50 transition-all hover:-translate-y-1">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{desc}</p>
            </div>
        </a>
    )
}