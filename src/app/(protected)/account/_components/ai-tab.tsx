"use client";

import { useState } from "react";
import { Sparkles, Bot } from "lucide-react";
import { cn } from "@/shared/utils/cn";

type AiLevel = "moderate" | "intermediate" | "advanced";

const levels: { id: AiLevel; label: string; desc: string; power: number }[] = [
    { id: "moderate", label: "Passivo", desc: "Apenas correções quando solicitado.", power: 33 },
    { id: "intermediate", label: "Assistente", desc: "Sugestões proativas e insights.", power: 66 },
    { id: "advanced", label: "Autônomo", desc: "Análise preditiva e gestão ativa.", power: 100 },
];

export default function AiTab() {
  const [currentLevel, setCurrentLevel] = useState<AiLevel>("intermediate");

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        <div className="border-b border-gray-100 pb-5">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-purple" /> Inteligência Artificial
            </h2>
            <p className="text-xs text-gray-500 mt-1">Ajuste o nível de autonomia do Facillit AI.</p>
        </div>

        {/* Card Visual Interativo */}
        <div className="bg-brand-gradient rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
                    <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold">Nível Atual: {levels.find(l => l.id === currentLevel)?.label}</h3>
                <p className="text-xs text-white/80 mb-6">{levels.find(l => l.id === currentLevel)?.desc}</p>

                <div className="w-full max-w-sm h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out"
                        style={{ width: `${levels.find(l => l.id === currentLevel)?.power}%` }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Seletores */}
        <div className="grid grid-cols-1 gap-3">
            {levels.map((lvl) => (
                <button
                    key={lvl.id}
                    onClick={() => setCurrentLevel(lvl.id)}
                    className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                        currentLevel === lvl.id 
                            ? "border-brand-purple bg-purple-50/10 ring-1 ring-brand-purple/20" 
                            : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                >
                    <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                        currentLevel === lvl.id ? "border-brand-purple" : "border-gray-300"
                    )}>
                        <div className={cn("w-2.5 h-2.5 rounded-full transition-all", currentLevel === lvl.id ? "bg-brand-purple scale-100" : "scale-0")} />
                    </div>
                    <div>
                        <span className={cn("block text-sm font-bold", currentLevel === lvl.id ? "text-brand-purple" : "text-gray-900")}>{lvl.label}</span>
                        <span className="text-[11px] text-gray-500">{lvl.desc}</span>
                    </div>
                </button>
            ))}
        </div>
    </div>
  );
}