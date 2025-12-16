"use client";

import { Check, Layout, DownloadCloud, AlertCircle } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps, ProfileType } from "@/types/onboarding";

// Definição Completa dos Módulos por Perfil
const moduleRegistry: Record<string, { id: string, name: string, cat: string, profile: ProfileType }[]> = {
    "education": [
        { id: "write", name: "Facillit Write", cat: "Redação AI", profile: "education" },
        { id: "games", name: "EduGames", cat: "Gamificação", profile: "education" },
        { id: "library", name: "Library", cat: "Conteúdo", profile: "education" },
        { id: "test", name: "Test", cat: "Avaliaçãos", profile: "education" },
        { id: "play", name: "Play", cat: "Conteúdo", profile: "education" },
        { id: "create", name: "Create", cat: "Criação", profile: "education" },
    ],
    "enterprise": [
        { id: "people", name: "People", cat: "RH & PDI", profile: "enterprise" },
        { id: "card", name: "Facillit Card", cat: "Benefícios", profile: "enterprise" },
        { id: "access", name: "Access", cat: "Segurança", profile: "enterprise" },
    ],
    "individuals": [
        { id: "day", name: "Facillit Day", cat: "Planner", profile: "individuals" },
        { id: "finances", name: "Finanças", cat: "Gestão", profile: "individuals" },
        { id: "stories", name: "Stories", cat: "Social", profile: "individuals" },
    ],
    "schools": [
        { id: "manager", name: "Manager", cat: "ERP Escolar", profile: "schools" },
        { id: "grade", name: "Gradebook", cat: "Notas", profile: "schools" },
    ],
    "startups": [
        { id: "growth", name: "Growth", cat: "Métricas", profile: "startups" },
        { id: "invest", name: "Invest", cat: "Equity", profile: "startups" },
    ]
};

export default function StepModules({ data, update, onNext, onBack }: StepProps) {
  
  // 1. Identificar perfis selecionados
  const activeProfiles = data.profileTypes || [];

  // 2. Gerar lista de módulos baseada nos perfis
  const availableModules = activeProfiles.flatMap(p => moduleRegistry[p] || []);

  const toggleModule = (id: string) => {
    const current = data.selectedModules || [];
    if (current.includes(id)) {
        update("selectedModules", current.filter(m => m !== id));
    } else {
        update("selectedModules", [...current, id]);
    }
  };

  const selectedCount = data.selectedModules?.length || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Header Visual */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
              <h4 className="font-bold text-gray-900 text-sm">Workspace Personalizado</h4>
              <p className="text-xs text-gray-500 mt-1">
                  Baseado em: {activeProfiles.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(", ")}
              </p>
          </div>
          <div className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 shadow-sm">
              {availableModules.length} Apps Disponíveis
          </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Instalação Modular</label>
        
        {availableModules.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
                {availableModules.map((m) => {
                    const isSelected = data.selectedModules.includes(m.id);
                    return (
                        <button
                            key={m.id}
                            onClick={() => toggleModule(m.id)}
                            className={cn(
                                "p-4 rounded-xl border text-left transition-all relative group h-24 flex flex-col justify-between overflow-hidden",
                                isSelected 
                                    ? "border-brand-green bg-white shadow-md transform scale-[1.02]" 
                                    : "border-gray-200 bg-white hover:border-gray-300"
                            )}
                        >
                            {/* Animação de Fundo ao Selecionar */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-green-50/50 animate-in fade-in duration-300 z-0"></div>
                            )}
                            
                            <div className="flex justify-between items-start relative z-10">
                                <h3 className={cn("text-sm font-bold", isSelected ? "text-brand-green" : "text-gray-900")}>{m.name}</h3>
                                <div className={cn(
                                    "rounded-full p-1 transition-all duration-300",
                                    isSelected ? "bg-brand-green text-white rotate-0" : "bg-gray-100 text-gray-300 -rotate-90 opacity-0 group-hover:opacity-100"
                                )}>
                                    {isSelected ? <Check className="w-3 h-3" /> : <DownloadCloud className="w-3 h-3"/>}
                                </div>
                            </div>
                            <div className="relative z-10 flex justify-between items-end">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{m.cat}</p>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 uppercase">{m.profile.slice(0,3)}</span>
                            </div>
                        </button>
                    )
                })}
            </div>
        ) : (
            <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center text-gray-400">
                <AlertCircle className="w-8 h-8 mb-2 opacity-50"/>
                <p className="text-sm">Nenhum perfil selecionado anteriormente.</p>
                <button onClick={onBack} className="text-xs text-brand-purple font-bold mt-2 hover:underline">Voltar e selecionar perfil</button>
            </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} className="w-14 h-14 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            ←
        </button>
        <button 
            onClick={onNext}
            className="flex-1 bg-brand-dark hover:bg-black text-white font-bold text-sm rounded-xl shadow-none transition-all py-4"
        >
            Instalar {selectedCount} Apps
        </button>
      </div>
    </div>
  );
}