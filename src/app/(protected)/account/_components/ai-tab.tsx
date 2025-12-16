"use client";

import { useState } from "react";
import { Sparkles, Bot, Loader2, Save, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { UserProfile, AIPreferences } from "@/types/account";
import { updateAiPreferences } from "../actions";

interface Props {
  user: UserProfile;
}

const levels: { id: AIPreferences['autonomy_level']; label: string; desc: string; power: number }[] = [
    { id: "moderate", label: "Passivo", desc: "Apenas correções quando solicitado.", power: 33 },
    { id: "intermediate", label: "Assistente", desc: "Sugestões proativas e insights.", power: 66 },
    { id: "advanced", label: "Autônomo", desc: "Análise preditiva e gestão ativa.", power: 100 },
];

export default function AiTab({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Estado local sincronizado com o perfil do usuário ou padrão
  const [currentLevel, setCurrentLevel] = useState<AIPreferences['autonomy_level']>(
    user.ai_preferences?.autonomy_level || "intermediate"
  );

  const handleSave = async () => {
    setLoading(true);
    setSuccess(false);

    try {
        // Preserva outras preferências, atualiza apenas o nível neste contexto
        const newPreferences: AIPreferences = {
            data_sharing: user.ai_preferences?.data_sharing ?? false,
            personalization: user.ai_preferences?.personalization ?? true,
            autonomy_level: currentLevel
        };

        const res = await updateAiPreferences(newPreferences);
        
        if (res.success) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }
    } catch (error) {
        console.error("Erro ao salvar IA:", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-purple" /> Inteligência Artificial
                </h2>
                <p className="text-xs text-gray-500 mt-1">Ajuste o nível de autonomia do Facillit AI.</p>
            </div>
            <button 
                onClick={handleSave}
                disabled={loading || currentLevel === user.ai_preferences?.autonomy_level}
                className={cn(
                    "flex items-center gap-2 px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all shadow-lg",
                    success ? "bg-green-600 hover:bg-green-700" : "bg-brand-dark hover:bg-black",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin"/> : success ? <Check className="w-3 h-3"/> : <Save className="w-3 h-3"/>}
                {success ? "Salvo!" : "Salvar Alterações"}
            </button>
        </div>

        {/* Card Visual Interativo */}
        <div className="bg-brand-gradient rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-brand-purple/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-5 border border-white/30 shadow-inner">
                    <Bot className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">Nível Atual: {levels.find(l => l.id === currentLevel)?.label}</h3>
                <p className="text-xs text-white/80 mb-8 max-w-xs">{levels.find(l => l.id === currentLevel)?.desc}</p>

                {/* Slider Visual */}
                <div className="w-full max-w-sm h-2 bg-black/20 rounded-full overflow-hidden relative">
                    <div 
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] transition-all duration-700 ease-out absolute top-0 left-0"
                        style={{ width: `${levels.find(l => l.id === currentLevel)?.power}%` }}
                    ></div>
                </div>
                <div className="flex justify-between w-full max-w-sm mt-2 text-[9px] font-bold uppercase tracking-widest text-white/50">
                    <span>Manual</span>
                    <span>Automático</span>
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
                        "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group relative overflow-hidden",
                        currentLevel === lvl.id 
                            ? "border-brand-purple bg-purple-50/10 ring-1 ring-brand-purple/20" 
                            : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                >
                    <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 z-10",
                        currentLevel === lvl.id ? "border-brand-purple" : "border-gray-300"
                    )}>
                        <div className={cn("w-3 h-3 rounded-full transition-all", currentLevel === lvl.id ? "bg-brand-purple scale-100" : "scale-0")} />
                    </div>
                    
                    <div className="z-10">
                        <span className={cn("block text-sm font-bold", currentLevel === lvl.id ? "text-brand-purple" : "text-gray-900")}>{lvl.label}</span>
                        <span className="text-[11px] text-gray-500">{lvl.desc}</span>
                    </div>

                    {/* Efeito sutil de background ao selecionar */}
                    {currentLevel === lvl.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-transparent opacity-50"></div>
                    )}
                </button>
            ))}
        </div>
    </div>
  );
}