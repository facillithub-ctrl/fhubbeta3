"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Building2, Rocket, Heart, Check, ArrowRight, Info, X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps, ProfileType } from "@/types/onboarding";

// Mapeamento dos Módulos Exatos do PDF para o Popup
const profileDetails: Record<string, string[]> = {
  education: ["Facillit Write", "Facillit Games", "Facillit Test", "Facillit Play", "Facillit Library", "Facillit Create"],
  schools: ["Facillit Edu", "Facillit Lab", "Gestão Pedagógica", "Portal do Professor"],
  startups: ["Facillit Center", "Facillit Host", "Facillit API", "CRM & KPIs"],
  enterprise: ["Facillit Access (IAM)", "Facillit People (RH)", "Facillit Card", "Governança"],
  individuals: ["Facillit Day", "Facillit Stories", "Facillit Finances", "Facillit C&C"]
};

// Dados Exatos do "Resumo – Facillit Hub.pdf"
const profiles = [
  { 
    id: "education", 
    title: "Facillit for Education", 
    desc: "Focada no aprendizado individual e desenvolvimento pessoal.", 
    icon: GraduationCap, 
    color: "text-purple-600", 
    bg: "bg-purple-50"
  },
  { 
    id: "schools", 
    title: "Facillit for Schools", 
    desc: "Infraestrutura institucional para escolas e sistemas educacionais.", 
    icon: Building2, 
    color: "text-indigo-600", 
    bg: "bg-indigo-50"
  },
  { 
    id: "startups", 
    title: "Facillit for Startups", 
    desc: "Foco: fundação, operação e escala de startups e empresas.", 
    icon: Rocket, 
    color: "text-pink-600", 
    bg: "bg-pink-50"
  },
  { 
    id: "enterprise", 
    title: "Facillit for Enterprise", 
    desc: "Foco: gestão corporativa, RH e operações em larga escala.", 
    icon: Briefcase, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50"
  },
  { 
    id: "individuals", 
    title: "Facillit for Individuals", 
    desc: "Foco: organização da vida pessoal, produtividade e carreira.", 
    icon: Heart, 
    color: "text-orange-600", 
    bg: "bg-orange-50"
  },
];

export default function StepProfile({ data, update, onNext, onBack }: StepProps) {
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    update("profileType", id);
    // Pré-seleção de módulos baseada na vertical
    const defaults: any = {
        education: ["write", "games", "play"],
        schools: ["edu", "lab"],
        startups: ["center", "api"],
        enterprise: ["people", "access"],
        individuals: ["day", "finances"]
    };
    update("selectedModules", defaults[id] || []);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col relative">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Seu Objetivo Principal</h1>
        <p className="text-gray-500 text-lg">Qual vertical melhor te descreve?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {profiles.map((p) => {
            const isSelected = data.profileType === p.id;
            return (
                <div key={p.id} className="relative group">
                    <button
                        onClick={() => handleSelect(p.id)}
                        className={cn(
                            "w-full flex flex-col text-left p-6 rounded-[24px] border-2 transition-all duration-300 relative overflow-hidden h-full",
                            isSelected 
                                ? `bg-white border-${p.color.split('-')[1]}-500 shadow-xl ring-2 ring-${p.color.split('-')[1]}-100 scale-[1.02] z-10` 
                                : "bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-lg"
                        )}
                    >
                        <div className="flex justify-between items-start w-full mb-4">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors", isSelected ? p.bg : "bg-white shadow-sm")}>
                                <p.icon className={cn("w-7 h-7", p.color)} />
                            </div>
                            <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", isSelected ? `bg-${p.color.split('-')[1]}-500 border-${p.color.split('-')[1]}-500` : "border-gray-300")}>
                                {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className={cn("text-lg font-bold mb-1", isSelected ? "text-gray-900" : "text-gray-700")}>{p.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{p.desc}</p>
                        </div>
                    </button>

                    {/* Botão de Info (Popup) */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setShowInfo(p.id); }}
                        className="absolute bottom-4 right-4 p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-brand-purple transition-colors z-20"
                        title="Ver apps inclusos"
                    >
                        <Info className="w-5 h-5" />
                    </button>
                </div>
            )
        })}
      </div>

      {/* POPUP DE DETALHES */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowInfo(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 relative mx-4" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowInfo(null)} className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                </button>
                
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl mx-auto flex items-center justify-center mb-4 text-brand-purple">
                        <Info className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Módulos Inclusos</h3>
                    <p className="text-sm text-gray-500">Apps disponíveis nesta vertical</p>
                </div>

                <ul className="space-y-3">
                    {profileDetails[showInfo]?.map((app, idx) => (
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

      <div className="flex justify-between pt-8 border-t border-gray-100 mt-auto">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">Voltar</button>
        <button 
            onClick={onNext} 
            disabled={!data.profileType}
            className="bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-10 rounded-2xl shadow-xl transition-all"
        >
            Continuar
        </button>
      </div>
    </div>
  );
}