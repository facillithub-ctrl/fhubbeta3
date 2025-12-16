"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Building2, Rocket, Heart, Check, Info, LucideIcon } from "lucide-react";
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
  { id: "education", title: "Education", icon: GraduationCap, desc: "Estudante ou Professor", details: "Acesso a LMS, Biblioteca Digital, Notas e IA Tutora." },
  { id: "schools", title: "Schools", icon: Building2, desc: "Gestão Escolar", details: "ERP Escolar, Gestão de Matrículas e Secretaria Digital." },
  { id: "startups", title: "Startups", icon: Rocket, desc: "Fundador ou Time", details: "Frameworks de Growth, CRM e conexão com investidores." },
  { id: "enterprise", title: "Enterprise", icon: Briefcase, desc: "Colaborador ou RH", details: "Portal do Colaborador, Benefícios e PDI." },
  { id: "individuals", title: "Individuals", icon: Heart, desc: "Produtividade Pessoal", details: "Gestão de Tarefas, Hábitos e Finanças." },
];

export default function StepProfile({ data, update, onNext, onBack }: StepProps) {
  // Estado para controlar qual popup está aberto
  const [activePopup, setActivePopup] = useState<ProfileType | null>(null);

  const toggleProfile = (id: ProfileType) => {
    const current = data.profileTypes || [];
    if (current.includes(id)) {
        update("profileTypes", current.filter(p => p !== id));
    } else {
        update("profileTypes", [...current, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 relative">
      
      <div className="space-y-3">
         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Selecione um ou mais</label>
         <div className="grid grid-cols-1 gap-3">
            {profiles.map((p) => {
                const isSelected = data.profileTypes?.includes(p.id);
                return (
                    <div 
                        key={p.id} 
                        className="relative group"
                        onMouseEnter={() => setActivePopup(p.id)}
                        onMouseLeave={() => setActivePopup(null)}
                    >
                        <button
                            onClick={() => toggleProfile(p.id)}
                            className={cn(
                                "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left relative z-10",
                                isSelected 
                                    ? "border-brand-purple bg-white shadow-[0_0_0_1px_#42047e]" 
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            )}
                        >
                            <div className={cn("p-3 rounded-lg shrink-0 transition-colors", isSelected ? "bg-brand-purple text-white" : "bg-gray-50 text-gray-400")}>
                                <p.icon className="w-5 h-5" />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className={cn("text-sm font-bold", isSelected ? "text-brand-purple" : "text-gray-900")}>{p.title}</h3>
                                <p className="text-[11px] text-gray-500 mt-0.5">{p.desc}</p>
                            </div>

                            <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center transition-all", isSelected ? "border-brand-purple bg-brand-purple" : "border-gray-200")}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                        </button>
                    </div>
                )
            })}
         </div>
      </div>

      {/* POPUP FIXADO GLOBAL (Renderizado fora do map para evitar z-index issues) */}
      {/* Usamos fixed para garantir que fique em cima de TUDO */}
      {activePopup && (
          <div className="hidden xl:block fixed z-[9999] p-5 bg-gray-900 text-white rounded-2xl shadow-2xl w-72 animate-in fade-in slide-in-from-left-2 duration-200 pointer-events-none border border-gray-800"
                style={{ 
                    // Posicionamento estratégico: À direita da área de formulário
                    left: "calc(50vw + 20px)", 
                    top: "50%",
                    transform: "translateY(-50%)"
                }}
          >
            {(() => {
                const p = profiles.find(pr => pr.id === activePopup);
                if(!p) return null;
                return (
                    <>
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-800">
                             <div className="p-2 rounded-lg bg-gray-800"><p.icon className="w-4 h-4 text-brand-purple"/></div>
                             <span className="font-bold text-sm">{p.title} Hub</span>
                        </div>
                        <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-500 mb-1">O que inclui:</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">{p.details}</p>
                    </>
                )
            })()}
          </div>
      )}

      {/* Mobile Hint */}
      <div className="xl:hidden mt-2 p-3 bg-blue-50 text-blue-800 text-[10px] rounded-lg border border-blue-100 flex gap-2">
         <Info className="w-4 h-4 shrink-0" />
         <p>Toque para selecionar. Múltiplas escolhas habilitam mais funcionalidades.</p>
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