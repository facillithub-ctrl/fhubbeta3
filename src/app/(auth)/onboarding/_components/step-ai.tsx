import { Shield, Sparkles, BrainCircuit, Zap, Loader2, Lock } from "lucide-react"; // OK
import { cn } from "@/shared/utils/cn";

const aiLevels = [
  { id: "moderate", title: "Passiva", desc: "IA age apenas sob comando.", icon: Shield },
  { id: "intermediate", title: "Assistiva", desc: "Sugestões contextuais inteligentes.", icon: Sparkles },
  { id: "advanced", title: "Autônoma", desc: "Automação e análise proativa.", icon: BrainCircuit },
];

export default function StepAI({ data, update, onBack, onFinish, isLoading }: any) {
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Inteligência do Hub</h1>
        <p className="text-gray-500 text-lg">Defina o nível de proatividade da nossa IA.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {aiLevels.map((lvl) => (
            <button
                key={lvl.id}
                onClick={() => update("aiLevel", lvl.id)}
                className={cn(
                    "flex items-center gap-6 p-5 rounded-3xl border-2 text-left transition-all",
                    data.aiLevel === lvl.id 
                        ? "border-brand-green bg-green-50/30 ring-1 ring-brand-green shadow-lg" 
                        : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                )}
            >
                <div className={cn("p-4 rounded-2xl shrink-0 transition-colors", data.aiLevel === lvl.id ? "bg-brand-green text-black shadow-md" : "bg-gray-100 text-gray-500")}>
                    <lvl.icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg">{lvl.title}</h3>
                    <p className="text-sm text-gray-500">{lvl.desc}</p>
                </div>
            </button>
        ))}
      </div>

      {/* Configurações Extras */}
      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-6 mt-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Zap className="w-5 h-5 fill-current" /></div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">Dispositivo Confiável</h4>
                    <p className="text-xs text-gray-500">Manter login ativo por 30 dias.</p>
                </div>
            </div>
            <button 
                onClick={() => update("deviceTrusted", !data.deviceTrusted)}
                className={cn("w-14 h-8 rounded-full flex items-center p-1 transition-colors duration-300", data.deviceTrusted ? "bg-brand-green" : "bg-gray-300")}
            >
                <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300", data.deviceTrusted ? "translate-x-6" : "translate-x-0")} />
            </button>
         </div>

         <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg text-brand-purple"><Lock className="w-5 h-5" /></div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900">Dados de Aprendizado</h4>
                    <p className="text-xs text-gray-500">Permitir que a IA aprenda com seu uso.</p>
                </div>
            </div>
            <button 
                onClick={() => update("permissions", { ...data.permissions, dataAnalysis: !data.permissions.dataAnalysis })}
                className={cn("w-14 h-8 rounded-full flex items-center p-1 transition-colors duration-300", data.permissions.dataAnalysis ? "bg-brand-purple" : "bg-gray-300")}
            >
                <div className={cn("w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300", data.permissions.dataAnalysis ? "translate-x-6" : "translate-x-0")} />
            </button>
         </div>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-100 mt-auto">
        <button onClick={onBack} disabled={isLoading} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50">Voltar</button>
        <button 
            onClick={onFinish} 
            disabled={isLoading}
            className="bg-brand-gradient text-white font-bold py-3.5 px-10 rounded-2xl shadow-xl shadow-brand-purple/20 hover:shadow-brand-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-80"
        >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Finalizar Setup"}
        </button>
      </div>
    </div>
  );
}