"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Building2, Rocket, Heart, Check, HelpCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps, ProfileType } from "@/types/onboarding";

type ProfileOption = {
  id: ProfileType;
  title: string;
  icon: typeof GraduationCap; // LucideIcon type
  desc: string;
  details: string;
};

const profiles: ProfileOption[] = [
  { id: "education", title: "Education", icon: GraduationCap, desc: "Estudante ou Professor", details: "Focado em aprendizado, redações com IA e gestão de notas." },
  { id: "schools", title: "Schools", icon: Building2, desc: "Gestão Escolar", details: "Infraestrutura para escolas, turmas e secretaria digital." },
  { id: "startups", title: "Startups", icon: Rocket, desc: "Fundador ou Time", details: "Ecossistema de growth, investidores e ferramentas de escalabilidade." },
  { id: "enterprise", title: "Enterprise", icon: Briefcase, desc: "Colaborador ou RH", details: "Soluções corporativas, gestão de pessoas e benefícios." },
  { id: "individuals", title: "Individuals", icon: Heart, desc: "Produtividade Pessoal", details: "Planner, finanças e organização da rotina diária." },
];

export default function StepProfile({ data, update, onNext, onBack }: StepProps) {
  // Controle de expansão do texto explicativo
  const [expandedId, setExpandedId] = useState<ProfileType | null>(null);

  const toggleProfile = (id: ProfileType) => {
    const current = data.profileTypes || [];
    if (current.includes(id)) {
        update("profileTypes", current.filter(p => p !== id));
    } else {
        update("profileTypes", [...current, id]);
    }
  };

  const toggleInfo = (e: React.MouseEvent, id: ProfileType) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* 🔹 EXIBIÇÃO DO FACILLIT ID (INSTITUCIONAL) */}
      <div className="p-5 rounded-2xl bg-brand-purple/[0.03] border border-brand-purple/10 relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-purple/10 flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
                </div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Identificador Facillit</span>
            </div>
            <div className="px-2 py-0.5 rounded-md bg-zinc-100 text-[9px] font-bold text-zinc-400 uppercase">
                Somente Leitura
            </div>
        </div>
        
        <div className="font-mono text-2xl font-black text-brand-purple tracking-[0.15em] select-all">
            {data.facillitId || "CARREGANDO..."}
        </div>
        
        {/* Detalhe estético lateral */}
        <div className="absolute top-0 right-0 w-1 h-full bg-brand-purple/20" />
      </div>

      <div className="space-y-3">
         <div className="flex items-center justify-between px-1">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Verticais de Atuação</label>
            <span className="text-[10px] font-medium text-zinc-400 italic">Múltipla escolha disponível</span>
         </div>

         <div className="grid grid-cols-1 gap-3">
            {profiles.map((p) => {
                const isSelected = data.profileTypes?.includes(p.id);
                const isExpanded = expandedId === p.id;

                return (
                    <div 
                        key={p.id} 
                        className={cn(
                            "group relative rounded-2xl border transition-all duration-300 bg-white",
                            isSelected 
                                ? "border-brand-purple shadow-sm ring-1 ring-brand-purple/20" 
                                : "border-zinc-200 hover:border-zinc-300"
                        )}
                    >
                        {/* Header do Card */}
                        <div 
                            onClick={() => toggleProfile(p.id)}
                            className="flex items-center gap-4 p-4 cursor-pointer select-none"
                        >
                            <div className={cn(
                                "p-3 rounded-xl shrink-0 transition-all duration-300", 
                                isSelected ? "bg-brand-purple text-white scale-105" : "bg-zinc-50 text-zinc-400"
                            )}>
                                <p.icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className={cn("text-sm font-bold tracking-tight", isSelected ? "text-brand-purple" : "text-zinc-900")}>
                                    {p.title}
                                </h3>
                                <p className="text-[11px] text-zinc-500 font-medium">{p.desc}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={(e) => toggleInfo(e, p.id)}
                                    className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                                        isExpanded ? "text-brand-purple bg-brand-purple/5" : "text-zinc-300 hover:bg-zinc-100"
                                    )}
                                >
                                    <HelpCircle className="w-4 h-4" />
                                </button>

                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300", 
                                    isSelected ? "border-brand-purple bg-brand-purple" : "border-zinc-200"
                                )}>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                                </div>
                            </div>
                        </div>

                        {/* Detalhes expansíveis */}
                        <div 
                            className={cn(
                                "overflow-hidden transition-all duration-500 ease-in-out px-4 bg-zinc-50/50 rounded-b-2xl",
                                isExpanded ? "max-h-32 opacity-100 py-4 border-t border-zinc-100" : "max-h-0 opacity-0 py-0"
                            )}
                        >
                            <div className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-brand-purple mt-1.5 shrink-0" />
                                <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">
                                    <span className="font-bold text-zinc-800">Recursos:</span> {p.details}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
         </div>
      </div>

      {/* 🔹 AÇÕES DO FOOTER */}
      <div className="flex gap-4 pt-8">
        <button 
            onClick={onBack} 
            className="w-14 h-14 flex items-center justify-center rounded-2xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 transition-all active:scale-95"
        >
            <span className="text-xl">←</span>
        </button>
        <button 
            onClick={onNext}
            disabled={!data.profileTypes || data.profileTypes.length === 0}
            className="flex-1 bg-zinc-900 hover:bg-black text-white font-bold text-sm rounded-2xl shadow-lg shadow-zinc-200 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
        >
            Próxima Etapa ({data.profileTypes?.length || 0})
        </button>
      </div>
    </div>
  );
}