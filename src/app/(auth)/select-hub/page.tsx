"use client";

import Link from "next/link";
import React from "react";
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Rocket, 
  Heart, 
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";

/* =======================
   TYPES
======================= */

type ThemeName = 'purple' | 'indigo' | 'pink' | 'emerald' | 'orange';

type ThemeStyleType = 'bg' | 'text' | 'border' | 'gradient';

type ThemeClasses = {
  bg: string;
  text: string;
  border: string;
  gradient: string;
};

type HubStatus = 'active' | 'beta' | 'locked';

type Hub = {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  icon: React.ElementType;
  status: HubStatus;
  theme: ThemeName;
};

/* =======================
   THEME HELPER
======================= */

const themeMap: Record<ThemeName, ThemeClasses> = {
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "group-hover:border-purple-500/30",
    gradient: "from-purple-500/20 to-transparent",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "group-hover:border-indigo-500/30",
    gradient: "from-indigo-500/20 to-transparent",
  },
  pink: {
    bg: "bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    border: "group-hover:border-pink-500/30",
    gradient: "from-pink-500/20 to-transparent",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "group-hover:border-emerald-500/30",
    gradient: "from-emerald-500/20 to-transparent",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "group-hover:border-orange-500/30",
    gradient: "from-orange-500/20 to-transparent",
  },
};

const getThemeClasses = (
  theme: ThemeName,
  type: ThemeStyleType
): string => {
  return themeMap[theme][type];
};

/* =======================
   DATA
======================= */

const hubs: Hub[] = [
  { 
    id: "education", 
    title: "Education", 
    desc: "Ambiente acadêmico completo.", 
    longDesc: "Gerencie aulas, notas e trilhas de aprendizado.",
    icon: GraduationCap, 
    status: "active",
    theme: "purple"
  },
  { 
    id: "schools", 
    title: "Schools", 
    desc: "Gestão escolar unificada.",
    longDesc: "Administração de turmas, docentes e financeiro.", 
    icon: Building2, 
    status: "active",
    theme: "indigo"
  },
  { 
    id: "startups", 
    title: "Startups", 
    desc: "Aceleração e crescimento.", 
    longDesc: "Ferramentas para escalar seu negócio digital.",
    icon: Rocket, 
    status: "beta",
    theme: "pink"
  },
  { 
    id: "enterprise", 
    title: "Enterprise", 
    desc: "Soluções corporativas.", 
    longDesc: "Recursos humanos, CRM e processos internos.",
    icon: Briefcase, 
    status: "locked", 
    theme: "emerald"
  },
  { 
    id: "individuals", 
    title: "Personal", 
    desc: "Produtividade pessoal.", 
    longDesc: "Organize sua vida, metas e documentos.",
    icon: Heart, 
    status: "active",
    theme: "orange"
  },
];

/* =======================
   COMPONENT
======================= */

export default function SelectHubPage() {
  return (
    <div className="min-h-screen w-full bg-background selection:bg-primary/20 flex flex-col items-center justify-center p-6 lg:p-12 transition-colors duration-500">
      
      {/* Background Decorativo */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-60" />

      {/* Header */}
      <div className="text-center max-w-3xl mb-12 space-y-4 animate-in slide-in-from-bottom-5 duration-700">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 shadow-sm mb-4">
           <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
           <span className="text-xs font-semibold text-foreground/80">
             Bem-vindo ao Ecossistema 3.0
           </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Onde vamos focar hoje?
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Selecione o Hub que deseja acessar. Você pode alternar entre ambientes a qualquer momento através da barra lateral.
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl animate-in slide-in-from-bottom-10 duration-1000 fill-mode-both">
        {hubs.map((hub) => {
          const isLocked = hub.status === 'locked';
          const LinkWrapper = isLocked ? 'div' : Link;

          return (
            <LinkWrapper 
              key={hub.id}
              href={isLocked ? '#' : `/dashboard/${hub.id}`}
              className={cn(
                "group relative flex flex-col p-8 rounded-[2rem] border bg-card/50 backdrop-blur-xl transition-all duration-300",
                isLocked 
                  ? "border-border/50 opacity-60 cursor-not-allowed grayscale-[0.5]" 
                  : "border-border hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer",
                getThemeClasses(hub.theme, 'border')
              )}
            >
              {/* Gradiente Hover */}
              {!isLocked && (
                <div
                  className={cn(
                    "absolute inset-0 rounded-[2rem] bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    getThemeClasses(hub.theme, 'gradient')
                  )}
                />
              )}

              <div className="relative z-10 flex items-start justify-between mb-8">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm",
                    getThemeClasses(hub.theme, 'bg'),
                    getThemeClasses(hub.theme, 'text')
                  )}
                >
                  <hub.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>

                {hub.status === 'beta' && (
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest border border-primary/20">
                    Beta
                  </span>
                )}

                {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
              </div>

              <div className="relative z-10 space-y-2 mb-6 flex-1">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {hub.title}
                </h3>
                <p className="text-sm font-medium text-foreground/80">
                  {hub.desc}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {hub.longDesc}
                </p>
              </div>

              <div className="relative z-10 flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors mt-auto">
                {isLocked ? "Em breve" : "Acessar Hub"}
                {!isLocked && (
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                )}
              </div>
            </LinkWrapper>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-300">
        <Link href="/account">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground rounded-full px-6">
            Gerenciar Facillit ID
          </Button>
        </Link>
        <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-widest">
          Facillit Ecosystem v3.0-beta
        </p>
      </div>

    </div>
  );
}
