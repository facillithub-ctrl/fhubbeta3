"use client";

import { Check, ArrowRight, PenTool, ClipboardCheck, PlayCircle, Gamepad2, BookOpen, Workflow, GraduationCap, School, FlaskConical, LayoutDashboard, Cloud, Code2, Shield, Users, CreditCard, Calendar, MessageCircle, Briefcase, TrendingUp } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { StepProps } from "@/types/onboarding";

// Mapeamento Completo
const ecosystem = [
  {
    category: "Education",
    target: ["education"],
    modules: [
        { id: "write", title: "Write", icon: PenTool, desc: "Redação IA" },
        { id: "games", title: "Games", icon: Gamepad2, desc: "Gamificação" },
        { id: "test", title: "Test", icon: ClipboardCheck, desc: "Simulados" },
        { id: "play", title: "Play", icon: PlayCircle, desc: "Streaming" },
        { id: "library", title: "Library", icon: BookOpen, desc: "Biblioteca" },
        { id: "create", title: "Create", icon: Workflow, desc: "Mapas Mentais" },
    ]
  },
  {
    category: "Schools",
    target: ["schools"],
    modules: [
        { id: "edu", title: "Edu", icon: School, desc: "Gestão Escolar" },
        { id: "lab", title: "Lab", icon: FlaskConical, desc: "Laboratório 3D" },
    ]
  },
  {
    category: "Startups",
    target: ["startups", "enterprise"],
    modules: [
        { id: "center", title: "Center", icon: LayoutDashboard, desc: "Sistema Op." },
        { id: "host", title: "Host", icon: Cloud, desc: "Cloud Hosting" },
        { id: "api", title: "API", icon: Code2, desc: "API Gateway" },
    ]
  },
  {
    category: "Enterprise",
    target: ["enterprise"],
    modules: [
        { id: "access", title: "Access", icon: Shield, desc: "IAM & SSO" },
        { id: "people", title: "People", icon: Users, desc: "RH Tech" },
        { id: "card", title: "Card", icon: CreditCard, desc: "Benefícios" },
    ]
  },
  {
    category: "Individuals",
    target: ["individuals", "education", "professional"],
    modules: [
        { id: "day", title: "Day", icon: Calendar, desc: "Agenda" },
        { id: "finances", title: "Finances", icon: TrendingUp, desc: "Finanças" },
        { id: "stories", title: "Stories", icon: MessageCircle, desc: "Comunidade" },
        { id: "career", title: "C&C", icon: Briefcase, desc: "Carreira" },
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
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Seus Aplicativos</h1>
            <p className="text-gray-500 text-lg">Ative o que você mais usa.</p>
        </div>
        <div className="text-right">
            <span className="text-2xl font-bold text-brand-purple">{data.selectedModules.length}</span>
            <p className="text-xs font-bold text-gray-400 uppercase">Selecionados</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-8">
        {ecosystem.map((section) => {
            const isTarget = section.target.includes(data.profileType || "none");
            
            return (
                <div key={section.category} className="space-y-4">
                    <div className="flex items-center gap-3">
                        <h3 className={cn("text-sm font-black uppercase tracking-widest", isTarget ? "text-brand-purple" : "text-gray-400")}>
                            {section.category}
                        </h3>
                        <div className="h-px bg-gray-100 flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {section.modules.map((mod) => {
                            const isSelected = data.selectedModules.includes(mod.id);
                            return (
                                <button
                                    key={mod.id}
                                    onClick={() => toggle(mod.id)}
                                    className={cn(
                                        "flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden",
                                        isSelected 
                                            ? "border-brand-purple bg-purple-50/50 shadow-sm" 
                                            : "border-gray-100 bg-white hover:border-gray-200"
                                    )}
                                >
                                    <div className={cn("p-2 rounded-lg shrink-0 transition-colors", isSelected ? "bg-white text-brand-purple" : "bg-gray-50 text-gray-400 group-hover:text-gray-600")}>
                                        <mod.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn("font-bold text-sm truncate", isSelected ? "text-brand-purple" : "text-gray-700")}>{mod.title}</h4>
                                        <p className="text-[10px] text-gray-500 leading-tight mt-0.5 truncate">{mod.desc}</p>
                                    </div>
                                    
                                    <div className={cn(
                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
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