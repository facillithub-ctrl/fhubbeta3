import { GraduationCap, Briefcase, Building2, LayoutGrid, Check } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const profiles = [
  { 
    id: "student", 
    title: "Estudante", 
    desc: "Acesso a redação IA, simulados e agenda de estudos.", 
    icon: GraduationCap, 
    color: "text-purple-600", 
    bg: "bg-purple-50",
    border: "border-purple-200"
  },
  { 
    id: "professional", 
    title: "Profissional", 
    desc: "Foco em carreira, networking e gestão financeira.", 
    icon: Briefcase, 
    color: "text-blue-600", 
    bg: "bg-blue-50",
    border: "border-blue-200"
  },
  { 
    id: "enterprise", 
    title: "Instituição", 
    desc: "Gestão de colaboradores, alunos e infraestrutura.", 
    icon: Building2, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50",
    border: "border-emerald-200"
  },
  { 
    id: "none", 
    title: "Apenas Explorar", 
    desc: "Pula personalizações e acessa o Hub Individuals.", 
    icon: LayoutGrid, 
    color: "text-gray-600", 
    bg: "bg-gray-100",
    border: "border-gray-200"
  },
];

export default function StepProfile({ data, update, onNext, onBack }: any) {
  
  const handleSelect = (id: string) => {
    update("profileType", id);
    // Pré-seleciona módulos baseados no perfil (lógica pode ser refinada)
    const defaults: any = {
        student: ["write", "games", "day"],
        professional: ["day", "finances", "career"],
        enterprise: ["people", "access", "day"],
        none: ["day"]
    };
    update("selectedModules", defaults[id] || []);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seu Objetivo Principal</h1>
        <p className="text-gray-500">Isso adapta o Hub para suas necessidades.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {profiles.map((p) => (
            <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className={cn(
                    "flex items-center gap-5 p-5 rounded-2xl border-2 text-left transition-all duration-300 relative group",
                    data.profileType === p.id 
                        ? `bg-white border-${p.color.split('-')[1]}-500 shadow-xl ring-1 ring-${p.color.split('-')[1]}-500` 
                        : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-md"
                )}
            >
                <div className={cn("w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors", p.bg, p.color)}>
                    <p.icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    <h3 className={cn("text-lg font-bold mb-1", data.profileType === p.id ? "text-gray-900" : "text-gray-700")}>{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
                {data.profileType === p.id && (
                    <div className={cn("absolute top-5 right-5 w-6 h-6 rounded-full flex items-center justify-center text-white", p.color.replace('text', 'bg'))}>
                        <Check className="w-3 h-3" />
                    </div>
                )}
            </button>
        ))}
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-50 mt-auto">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-800 px-4 py-2">Voltar</button>
        <button 
            onClick={onNext} 
            disabled={!data.profileType}
            className="bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
        >
            Continuar
        </button>
      </div>
    </div>
  );
}