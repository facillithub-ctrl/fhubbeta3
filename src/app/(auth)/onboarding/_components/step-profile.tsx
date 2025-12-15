import { useState } from "react";
import { GraduationCap, Briefcase, Building2, Rocket, Heart, Check, ArrowRight, Info, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps } from "@/types/onboarding";

// Mapeamento de Módulos por Perfil (Do PDF)
const profileDetails: Record<string, string[]> = {
  education: ["Facillit Write", "Facillit Games", "Facillit Test", "Facillit Play", "Facillit Library", "Facillit Create"],
  individuals: ["Facillit Day", "Facillit Finances", "Facillit Stories", "Facillit C&C"],
  schools: ["Facillit Edu", "Facillit Lab", "Gestão Acadêmica", "Portal do Professor"],
  startups: ["Facillit Center", "Facillit Host", "Facillit API", "CRM Integrado"],
  enterprise: ["Facillit Access (IAM)", "Facillit People (RH)", "Facillit Card", "Governança de Dados"]
};

const profiles = [
  { 
    id: "education", 
    title: "Facillit for Education", 
    desc: "Aprendizado individual e desenvolvimento.", 
    icon: GraduationCap, 
    color: "text-purple-600", 
    bg: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  { 
    id: "individuals", 
    title: "Facillit for Individuals", 
    desc: "Organização pessoal, rotina e carreira.", 
    icon: Heart, 
    color: "text-orange-600", 
    bg: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  { 
    id: "schools", 
    title: "Facillit for Schools", 
    desc: "Infraestrutura para gestão educacional.", 
    icon: Building2, 
    color: "text-indigo-600", 
    bg: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  { 
    id: "startups", 
    title: "Facillit for Startups", 
    desc: "Operação e escala de negócios tech.", 
    icon: Rocket, 
    color: "text-pink-600", 
    bg: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  { 
    id: "enterprise", 
    title: "Facillit for Enterprise", 
    desc: "Gestão corporativa e operações em escala.", 
    icon: Briefcase, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
];

export default function StepProfile({ data, update, onNext, onBack }: StepProps) {
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    update("profileType", id);
    // Lógica de pré-seleção mantida...
    const defaults: any = {
        education: ["write", "games", "test", "library", "play", "create"],
        individuals: ["day", "finances", "stories", "career"],
        schools: ["edu", "lab"],
        startups: ["center", "host", "api"],
        enterprise: ["access", "people", "card"]
    };
    update("selectedModules", defaults[id] || []);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold text-gray-900">Seu Objetivo Principal</h1>
        <p className="text-gray-500 text-lg">Escolha o Hub que melhor se adapta a você.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {profiles.map((p) => {
            const isSelected = data.profileType === p.id;
            return (
                <div key={p.id} className="relative group">
                    <button
                        onClick={() => handleSelect(p.id)}
                        className={cn(
                            "w-full flex flex-col text-left p-6 rounded-[24px] border-2 transition-all duration-300 relative overflow-hidden",
                            isSelected 
                                ? `bg-white border-${p.color.split('-')[1]}-500 shadow-xl ring-2 ring-${p.color.split('-')[1]}-100 scale-[1.02] z-10` 
                                : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-lg"
                        )}
                    >
                        <div className="flex justify-between items-start w-full mb-4">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors", isSelected ? p.bg : "bg-gray-50")}>
                                <p.icon className={cn("w-7 h-7", p.color)} />
                            </div>
                            <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", isSelected ? `bg-${p.color.split('-')[1]}-500 border-${p.color.split('-')[1]}-500` : "border-gray-200")}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className={cn("text-lg font-bold mb-1", isSelected ? "text-gray-900" : "text-gray-700")}>{p.title}</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed pr-8">{p.desc}</p>
                        </div>
                    </button>

                    {/* Botão de Info (Popup Trigger) */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowInfo(p.id); }}
                        className="absolute bottom-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-brand-purple transition-colors z-20"
                        title="Ver apps inclusos"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            )
        })}
      </div>

      {/* POPUP DE DETALHES (Modal Simples) */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowInfo(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowInfo(null)} className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                </button>
                
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center mb-4 text-brand-purple">
                        <Info className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Módulos Inclusos</h3>
                    <p className="text-sm text-gray-500">Apps disponíveis no perfil selecionado</p>
                </div>

                <ul className="space-y-3">
                    {profileDetails[showInfo].map((app, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-bold text-gray-700">{app}</span>
                        </li>
                    ))}
                </ul>

                <button onClick={() => setShowInfo(null)} className="w-full mt-6 bg-brand-dark text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform">
                    Entendi
                </button>
            </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-8 border-t border-gray-100">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">Voltar</button>
        <button 
            onClick={onNext} 
            disabled={!data.profileType}
            className="bg-brand-dark text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
            Confirmar <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}