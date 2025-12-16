"use client";

import { Loader2, Sparkles, Lock, Zap, Bot } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps, AiLevel } from "@/types/onboarding";

const levels: { id: AiLevel, label: string, desc: string, power: number }[] = [
    { id: "moderate", label: "Passivo", desc: "Apenas correções quando solicitado.", power: 33 },
    { id: "intermediate", label: "Assistente", desc: "Sugestões proativas e insights.", power: 66 },
    { id: "advanced", label: "Autônomo", desc: "Análise preditiva e gestão ativa.", power: 100 },
];

export default function StepAI({ data, update, onBack, onFinish, isLoading }: StepProps) {
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Brand Card Interativo */}
      <div className="bg-brand-gradient rounded-2xl p-8 text-white relative overflow-hidden shadow-xl shadow-brand-purple/20 transition-all hover:scale-[1.01]">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-green/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <Bot className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-1">Facillit AI 2.0</h3>
              <p className="text-xs text-white/80 max-w-[200px] leading-relaxed mb-6">
                Seu copiloto de produtividade e aprendizado.
              </p>

              {/* Slider Visual */}
              <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700 ease-out"
                    style={{ 
                        width: `${levels.find(l => l.id === data.aiLevel)?.power}%` 
                    }}
                  ></div>
              </div>
              <div className="flex justify-between w-full text-[9px] font-bold uppercase tracking-widest text-white/60">
                  <span>Min</span>
                  <span>Max</span>
              </div>
          </div>
      </div>

      <div className="space-y-3">
         <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Configurar Nível</label>
         <div className="grid grid-cols-1 gap-3">
            {levels.map((lvl) => (
                <button
                    key={lvl.id}
                    onClick={() => update("aiLevel", lvl.id)}
                    className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group hover:border-brand-purple/50",
                        data.aiLevel === lvl.id 
                            ? "border-brand-purple bg-purple-50/10 ring-1 ring-brand-purple/20" 
                            : "border-gray-200 bg-white"
                    )}
                >
                    <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                        data.aiLevel === lvl.id ? "border-brand-purple" : "border-gray-300 group-hover:border-gray-400"
                    )}>
                        <div className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all",
                            data.aiLevel === lvl.id ? "bg-brand-purple scale-100" : "scale-0"
                        )} />
                    </div>

                    <div>
                        <span className={cn("block text-sm font-bold", data.aiLevel === lvl.id ? "text-brand-purple" : "text-gray-900")}>{lvl.label}</span>
                        <span className="text-[11px] text-gray-500">{lvl.desc}</span>
                    </div>
                    
                    {data.aiLevel === lvl.id && <Sparkles className="w-4 h-4 text-brand-purple ml-auto animate-pulse" />}
                </button>
            ))}
         </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3">
        <Lock className="w-4 h-4 text-gray-400 mt-0.5" />
        <p className="text-[10px] text-gray-500 leading-relaxed">
            Seus dados são criptografados (E2E). A IA processa informações contextuais apenas para personalizar sua experiência e não compartilha dados sensíveis.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button onClick={onBack} disabled={isLoading} className="w-14 h-14 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            ←
        </button>
        <button 
            onClick={onFinish}
            disabled={isLoading}
            className="flex-1 bg-brand-dark hover:bg-black text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 py-4"
        >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Finalizar e Acessar Hub"}
        </button>
      </div>
    </div>
  );
}