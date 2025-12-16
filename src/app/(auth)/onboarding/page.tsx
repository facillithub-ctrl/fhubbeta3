"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { OnboardingData } from "@/types/onboarding";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";
import { completeOnboarding } from "./actions";

// Componentes dos Passos
import StepIdentity from "./_components/step-identity";
import StepLocation from "./_components/step-location";
import StepProfile from "./_components/step-profile";
import StepModules from "./_components/step-modules";
import StepAI from "./_components/step-ai";

const steps = [
  { id: 1, label: "Identidade" },
  { id: 2, label: "Localização" },
  { id: 3, label: "Perfil" },
  { id: 4, label: "Apps" },
  { id: 5, label: "I.A." }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const [formData, setFormData] = useState<OnboardingData>({
    handle: "",
    profileImage: null,
    pronouns: "",
    gender: "",
    sexuality: "",
    address: null,
    profileTypes: [],
    selectedModules: [],
    aiLevel: "intermediate",
    deviceTrusted: true,
    permissions: { recommendations: true, dataAnalysis: true }
  });

  // useCallback corrige problemas de referência e tipagem ao passar para filhos
  const updateData = useCallback(<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = () => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => prev - 1);
  };

  const finishOnboarding = async () => {
    setIsLoading(true);
    try {
        const result = await completeOnboarding(formData);
        
        if (result.success) {
            router.push("/account");
        } else {
            alert("Erro ao salvar dados: " + result.error);
            setIsLoading(false);
        }
    } catch (error) {
        console.error("Erro critico:", error);
        alert("Erro de conexão. Tente novamente.");
        setIsLoading(false);
    }
  };

  // Lógica de Scroll otimizada para evitar loops de renderização
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    const hasMoreContent = scrollHeight > clientHeight;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
    const shouldShow = hasMoreContent && !isAtBottom;

    // Só atualiza o estado se o valor mudar
    setShowScrollArrow(prev => (prev !== shouldShow ? shouldShow : prev));
  }, []);

  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;

    // Checagem inicial
    handleScroll();

    div.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
        div.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
  }, [step, handleScroll]); // Recria listeners quando o passo muda (conteúdo muda)

  const currentInfo = useMemo(() => {
    switch (step) {
      case 1:
        return {
            title: "Sua Identidade Digital",
            text: "Seu @handle será sua chave mestra no ecossistema Facillit. Escolha com sabedoria.",
            highlight: "Dica: Nomes curtos são mais valiosos."
        };
      case 2:
        return {
            title: "Contexto Regional",
            text: "A localização ajusta automaticamente o currículo (BNCC), feriados locais e fuso horário. Seus dados exatos permanecem privados.",
            highlight: "Criptografia de ponta a ponta."
        };
      case 3:
        return {
            title: "Definição de Perfil",
            text: "Selecione suas áreas de atuação. Isso define quais Hubs serão criados no seu Workspace.",
            highlight: "Multi-perfil habilitado."
        };
      case 4:
        return {
            title: "Montando Workspace",
            text: "Pré-selecionamos as ferramentas essenciais para seus perfis. Você pode personalizar depois.",
            highlight: "Arquitetura modular."
        };
      case 5:
        return {
            title: "Calibragem da I.A.",
            text: "Defina o nível de autonomia da sua assistente. Você tem controle total sobre os dados.",
            highlight: "Privacidade em primeiro lugar."
        };
      default: return { title: "", text: "", highlight: "" };
    }
  }, [step]);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row font-sans text-gray-900 overflow-hidden">
      
      {/* --- ESQUERDA: FORMULÁRIO (60%) --- */}
      <div className="w-full lg:w-[60%] flex flex-col relative z-10 h-[100dvh] lg:h-screen border-r border-gray-100 bg-white">
        
        {/* Header */}
        <div className="px-6 sm:px-10 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-30 shrink-0">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold shadow-sm text-sm">F</div>
                <div className="h-4 w-[1px] bg-gray-200"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Setup {step}/{steps.length}</span>
             </div>
             <div className="flex gap-1.5">
                {steps.map(s => (
                    <div key={s.id} className={cn("h-1 rounded-full transition-all duration-500", s.id <= step ? "w-6 bg-brand-green" : "w-2 bg-gray-100")} />
                ))}
             </div>
        </div>

        {/* Scroll Area */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative pb-10"
        >
            <div className="max-w-[580px] mx-auto p-6 sm:p-12 py-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="lg:hidden mb-8 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                    <h2 className="font-bold text-sm text-gray-900">{currentInfo.title}</h2>
                    <p className="text-xs text-gray-500 mt-1">{currentInfo.text}</p>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8 hidden lg:block">
                    {currentInfo.title}
                </h1>

                <div className="min-h-[400px]">
                    {step === 1 && <StepIdentity data={formData} update={updateData} onNext={nextStep} />}
                    {step === 2 && <StepLocation data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 3 && <StepProfile data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 4 && <StepModules data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 5 && <StepAI data={formData} update={updateData} onBack={prevStep} onFinish={finishOnboarding} isLoading={isLoading} />}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 opacity-80 hover:opacity-100 transition-opacity">
                    <SecureEnvironmentCard />
                </div>
            </div>
        </div>

        <div className={cn("absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 flex flex-col items-center gap-1 z-20", showScrollArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            <span className="text-[9px] font-bold text-gray-400 bg-white/90 px-3 py-1 rounded-full shadow-sm backdrop-blur border border-gray-100">
                Role para continuar
            </span>
            <ChevronDown className="w-5 h-5 text-brand-purple animate-bounce" />
        </div>
      </div>

      {/* --- DIREITA: CONTEXTO (40%) --- */}
      <div className="hidden lg:flex lg:w-[40%] bg-white flex-col justify-start pt-32 px-12 xl:px-20 relative overflow-hidden border-l border-gray-50">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple opacity-[0.02] blur-[120px] rounded-full pointer-events-none"></div>

         <div className="relative z-10">
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                 <span className="text-xl font-bold text-brand-purple">{step}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-snug mb-5 transition-all duration-300">
                {currentInfo.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-8 transition-all duration-300">
                {currentInfo.text}
            </p>
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)]">
                <HelpCircle className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 font-medium leading-relaxed">{currentInfo.highlight}</p>
            </div>
         </div>
         <div className="absolute bottom-10 left-12">
            <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">Facillit Ecosystem</p>
         </div>
      </div>
    </div>
  );
}