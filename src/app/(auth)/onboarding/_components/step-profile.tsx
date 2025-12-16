"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Building2, Rocket, Heart, Check, HelpCircle, LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps, ProfileType } from "@/types/onboarding";

type ProfileOption = {
  id: ProfileType;
  title: string;
  icon: LucideIcon;
  desc: string;
  details: string;
};

const profiles: ProfileOption[] = [
  { id: "education", title: "Education", icon: GraduationCap, desc: "Estudante ou Professor", details: "Acesso completo a ferramentas de aprendizado, notas e IA tutora." },
  { id: "schools", title: "Schools", icon: Building2, desc: "Gestão Escolar", details: "Painel administrativo para matrículas, financeiro e secretaria." },
  { id: "startups", title: "Startups", icon: Rocket, desc: "Fundador ou Time", details: "Ferramentas de Growth, CRM e conexão com investidores." },
  { id: "enterprise", title: "Enterprise", icon: Briefcase, desc: "Colaborador ou RH", details: "Portal corporativo, holerites e benefícios flexíveis." },
  { id: "individuals", title: "Individuals", icon: Heart, desc: "Produtividade Pessoal", details: "Planner pessoal, gestão de tarefas e finanças." },
];

export default function StepProfile({ data, update, onNext, onBack }: StepProps) {
  // Estado para controlar quais explicações estão expandidas
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
    e.stopPropagation(); // Evita selecionar o card ao clicar no ?
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="space-y-3">
         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Selecione um ou mais</label>
         <div className="grid grid-cols-1 gap-3">
            {profiles.map((p) => {
                const isSelected = data.profileTypes?.includes(p.id);
                const isExpanded = expandedId === p.id;

                return (
                    <div 
                        key={p.id} 
                        className={cn(
                            "relative rounded-xl border transition-all duration-300 bg-white",
                            isSelected 
                                ? "border-brand-purple shadow-[0_0_0_1px_#42047e]" 
                                : "border-gray-200 hover:border-gray-300"
                        )}
                    >
                        {/* Área Clicável Principal */}
                        <div 
                            onClick={() => toggleProfile(p.id)}
                            className="flex items-center gap-4 p-4 cursor-pointer select-none"
                        >
                            <div className={cn("p-3 rounded-lg shrink-0 transition-colors", isSelected ? "bg-brand-purple text-white" : "bg-gray-50 text-gray-400")}>
                                <p.icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className={cn("text-sm font-bold", isSelected ? "text-brand-purple" : "text-gray-900")}>{p.title}</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">{p.desc}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Botão de Informação (?) */}
                                <button 
                                    onClick={(e) => toggleInfo(e, p.id)}
                                    className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100",
                                        isExpanded ? "text-brand-purple bg-purple-50" : "text-gray-300"
                                    )}
                                >
                                    <HelpCircle className="w-4 h-4" />
                                </button>

                                {/* Checkbox Visual */}
                                <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-brand-purple bg-brand-purple" : "border-gray-200")}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                            </div>
                        </div>

                        {/* Texto Explicativo Inline (Expansível) */}
                        <div 
                            className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out border-t border-dashed border-gray-100 mx-4",
                                isExpanded ? "max-h-20 opacity-100 py-3" : "max-h-0 opacity-0 py-0 border-none"
                            )}
                        >
                            <p className="text-[11px] text-gray-500 leading-relaxed pl-1">
                                <span className="font-bold text-gray-700">Inclui:</span> {p.details}
                            </p>
                        </div>
                    </div>
                )
            })}
         </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            ←
        </button>
        <button 
            onClick={onNext}
            disabled={!data.profileTypes || data.profileTypes.length === 0}
            className="flex-1 bg-brand-dark hover:bg-black text-white font-bold text-sm rounded-xl shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
            Confirmar Perfis ({data.profileTypes?.length || 0})
        </button>
      </div>
    </div>
  );
}