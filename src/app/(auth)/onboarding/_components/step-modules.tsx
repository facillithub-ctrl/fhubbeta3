import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps } from "@/types/onboarding"; // Tipo importado

// Mapeamento Completo do Resumo - Facillit Hub.pdf
const ecosystem = [
  {
    category: "Education",
    description: "Aprendizado e Criação",
    target: ["student"], // Quem vê isso expandido por padrão
    modules: [
      { id: "write", title: "Write", icon: "✍️", desc: "Redação com IA" },
      { id: "games", title: "Games", icon: "🎮", desc: "Gamificação" },
      { id: "test", title: "Test", icon: "📝", desc: "Simulados" },
      { id: "play", title: "Play", icon: "▶️", desc: "Videoaulas" },
      { id: "library", title: "Library", icon: "📚", desc: "Acervo Digital" },
      { id: "create", title: "Create", icon: "🎨", desc: "Mapas Mentais" },
    ]
  },
  {
    category: "Individuals",
    description: "Produtividade Pessoal",
    target: ["student", "professional", "none"],
    modules: [
      { id: "day", title: "Day", icon: "📅", desc: "Agenda & Hábitos" },
      { id: "finances", title: "Finances", icon: "💰", desc: "Gestão Financeira" },
      { id: "stories", title: "Stories", icon: "💬", desc: "Comunidade" },
      { id: "career", title: "C&C", icon: "💼", desc: "Carreira" },
    ]
  },
  {
    category: "Schools",
    description: "Gestão Escolar",
    target: ["enterprise"],
    modules: [
      { id: "edu", title: "Edu", icon: "🏫", desc: "Gestão Acadêmica" },
      { id: "lab", title: "Lab", icon: "🧪", desc: "Laboratório 3D" },
    ]
  },
  {
    category: "Enterprise & Startups",
    description: "Corporativo",
    target: ["enterprise", "professional"],
    modules: [
      { id: "access", title: "Access", icon: "🔐", desc: "Gestão IAM" },
      { id: "people", title: "People", icon: "👥", desc: "RH Tech" },
      { id: "center", title: "Center", icon: "📊", desc: "CRM & Projetos" },
      { id: "card", title: "Card", icon: "💳", desc: "Benefícios" },
      { id: "api", title: "API", icon: "🔌", desc: "Integrações" },
    ]
  }
];

export default function StepModules({ data, update, onNext, onBack }: StepProps) {
  
  const toggle = (id: string) => {
    const current = data.selectedModules;
    if (current.includes(id)) {
        update("selectedModules", current.filter((m) => m !== id));
    } else {
        update("selectedModules", [...current, id]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col h-full">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Seus Aplicativos</h1>
            <p className="text-gray-500">Personalizamos o Hub com base no perfil <strong>{data.profileType?.toUpperCase()}</strong>.</p>
        </div>
        <div className="text-right">
            <span className="text-2xl font-bold text-brand-purple">{data.selectedModules.length}</span>
            <p className="text-xs font-bold text-gray-400 uppercase">Selecionados</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-8">
        {ecosystem.map((section) => {
            // Verifica se essa seção é relevante para o perfil escolhido
            const isRelevant = section.target.includes(data.profileType || "none");
            
            // Se for relevante, mostra os cards. Se não, mostra minimizado (opcional, aqui mostro tudo organizado)
            return (
                <div key={section.category} className={cn("space-y-4", !isRelevant && "opacity-60 hover:opacity-100 transition-opacity")}>
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">{section.category}</h3>
                        <div className="h-px bg-gray-100 flex-1"></div>
                        {!isRelevant && <span className="text-[10px] text-gray-300 font-medium">Opcional</span>}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {section.modules.map((mod) => {
                            const isSelected = data.selectedModules.includes(mod.id);
                            return (
                                <button
                                    key={mod.id}
                                    onClick={() => toggle(mod.id)}
                                    className={cn(
                                        "flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden",
                                        isSelected 
                                            ? "border-brand-purple bg-purple-50/50" 
                                            : "border-gray-100 bg-white hover:border-gray-200"
                                    )}
                                >
                                    <span className="text-2xl">{mod.icon}</span>
                                    <div>
                                        <h4 className={cn("font-bold text-sm", isSelected ? "text-brand-purple" : "text-gray-700")}>{mod.title}</h4>
                                        <p className="text-xs text-gray-500 leading-tight mt-0.5">{mod.desc}</p>
                                    </div>
                                    
                                    <div className={cn(
                                        "absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                        isSelected ? "border-brand-purple bg-brand-purple text-white scale-100" : "border-gray-200 scale-90 opacity-0 group-hover:opacity-100"
                                    )}>
                                        <Check className="w-3 h-3" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )
        })}
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-100 mt-auto">
        <button onClick={onBack} className="text-gray-500 font-bold hover:text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors">Voltar</button>
        <button onClick={onNext} className="bg-brand-dark text-white font-bold py-3.5 px-10 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
            Continuar
        </button>
      </div>
    </div>
  );
}