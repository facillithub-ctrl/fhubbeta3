"use client";

import { useState, useTransition } from "react";
import { Sparkles, BrainCircuit, Shield, Zap } from "lucide-react";
import { updateAISettings } from "../actions";
import { cn } from "@/shared/utils/cn";

const levels = [
  { id: "moderate", title: "Moderada", desc: "IA passiva, age apenas quando solicitada.", icon: Shield },
  { id: "intermediate", title: "Equilibrada", desc: "Sugestões úteis baseadas no seu uso.", icon: Sparkles },
  { id: "advanced", title: "Autônoma", desc: "IA proativa, automação total de rotinas.", icon: BrainCircuit },
];

export function AITab({ profile }: { profile: any }) {
  const [isPending, startTransition] = useTransition();
  const [currentLevel, setCurrentLevel] = useState(profile.ai_level || "intermediate");

  const handleSelect = (id: string) => {
    setCurrentLevel(id);
    startTransition(async () => {
        await updateAISettings(profile.id, { aiLevel: id });
    });
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
        
        <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-purple" /> Cérebro do Hub
            </h2>
            <p className="text-gray-500 text-sm mt-1">Defina o quanto a Inteligência Artificial pode te ajudar.</p>
        </div>

        <div className="grid gap-4">
            {levels.map((lvl) => (
                <button
                    key={lvl.id}
                    onClick={() => handleSelect(lvl.id)}
                    className={cn(
                        "flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                        currentLevel === lvl.id 
                            ? "border-brand-purple bg-purple-50/50 ring-1 ring-brand-purple" 
                            : "border-gray-100 bg-white hover:border-gray-200"
                    )}
                >
                    <div className={cn("p-3 rounded-xl shrink-0 transition-colors", currentLevel === lvl.id ? "bg-brand-purple text-white" : "bg-gray-100 text-gray-500")}>
                        <lvl.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{lvl.title}</h3>
                        <p className="text-sm text-gray-500">{lvl.desc}</p>
                    </div>
                    {currentLevel === lvl.id && (
                        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-purple-100/50 to-transparent pointer-events-none"></div>
                    )}
                </button>
            ))}
        </div>

        {/* Feature Extra */}
        <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-2xl flex items-start gap-4">
            <Zap className="w-6 h-6 text-yellow-600 mt-1" />
            <div>
                <h4 className="font-bold text-gray-900 text-sm">Modo Turbo (Experimental)</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Permite que a IA acesse dados de outras verticais (Ex: usar dados financeiros para sugerir cursos).
                </p>
            </div>
            <div className="ml-auto">
                <button className="text-xs font-bold bg-white border border-yellow-200 px-3 py-1.5 rounded-lg text-yellow-700 shadow-sm hover:bg-yellow-50 transition-colors">
                    Ativar
                </button>
            </div>
        </div>
    </div>
  );
}