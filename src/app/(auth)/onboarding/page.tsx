"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { OnboardingData } from "@/types/onboarding";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";
import { completeOnboarding } from "./actions";
import { FormError } from "@/shared/ui/form-error";
import { AppError } from "@/lib/errors/types";

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
  const [submitError, setSubmitError] = useState<AppError | undefined>(undefined);
  
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

  const updateData = useCallback(<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const nextStep = () => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitError(undefined);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setSubmitError(undefined);
    setStep((prev) => prev - 1);
  };

  const finishOnboarding = async () => {
    setIsLoading(true);
    setSubmitError(undefined);

    try {
        const result = await completeOnboarding(formData);
        
        if (result.success) {
            router.push("/account");
        } else {
            setSubmitError(result.error);
            setIsLoading(false);
            if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Erro critico:", error);
        setSubmitError({
            code: 'SYS_NET',
            message: 'Erro de conexão inesperado. Verifique sua internet.',
            category: 'SYSTEM',
            techDescription: String(error)
        });
        setIsLoading(false);
        if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    const hasMoreContent = scrollHeight > clientHeight;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
    const shouldShow = hasMoreContent && !isAtBottom;

    setShowScrollArrow(prev => (prev !== shouldShow ? shouldShow : prev));
  }, []);

useEffect(() => {
  const div = scrollRef.current;
  if (!div) return;

  div.addEventListener('scroll', handleScroll);

  return () => {
    div.removeEventListener('scroll', handleScroll);
  };
  }, 
  []);

  
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
    <div className="min-h-screen w-full bg-background flex flex-col lg:flex-row font-sans text-foreground overflow-hidden transition-colors duration-300">
      
      {/* --- ESQUERDA: FORMULÁRIO (60%) --- */}
      <div className="w-full lg:w-[60%] flex flex-col relative z-10 h-[100dvh] lg:h-screen border-r border-border bg-background">
        
        {/* Header */}
        <div className="px-6 sm:px-10 py-5 border-b border-border flex items-center justify-between bg-background z-30 shrink-0">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm text-sm">F</div>
                <div className="h-4 w-[1px] bg-border"></div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Etapa {step}/{steps.length}</span>
             </div>
             <div className="flex gap-1.5">
                {steps.map(s => (
                    <div key={s.id} className={cn("h-1 rounded-full transition-all duration-500", s.id <= step ? "w-6 bg-primary" : "w-2 bg-muted")} />
                ))}
             </div>
        </div>

        {/* Scroll Area */}
        <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-hide relative pb-10 bg-background"
        >
            <div className="max-w-[580px] mx-auto p-6 sm:p-12 py-8 animate-in slide-in-from-bottom-4 duration-500">
                <div className="lg:hidden mb-8 p-4 bg-muted/30 rounded-xl border border-border">
                    <h2 className="font-bold text-sm text-foreground">{currentInfo.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">{currentInfo.text}</p>
                </div>

                <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-8 hidden lg:block">
                    {currentInfo.title}
                </h1>

                {/* Área de Erro */}
                <div className="mb-6">
                   <FormError error={submitError} />
                </div>

                <div className="min-h-[400px]">
                    {step === 1 && <StepIdentity data={formData} update={updateData} onNext={nextStep} />}
                    {step === 2 && <StepLocation data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 3 && <StepProfile data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 4 && <StepModules data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                    {step === 5 && <StepAI data={formData} update={updateData} onBack={prevStep} onFinish={finishOnboarding} isLoading={isLoading} />}
                </div>

                <div className="mt-12 pt-8 border-t border-border opacity-80 hover:opacity-100 transition-opacity">
                    <SecureEnvironmentCard />
                </div>
            </div>
        </div>

        <div className={cn("absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 flex flex-col items-center gap-1 z-20", showScrollArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
            <span className="text-[9px] font-bold text-muted-foreground bg-background/90 px-3 py-1 rounded-full shadow-sm backdrop-blur border border-border">
                Role para continuar
            </span>
            <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
        </div>
      </div>

      {/* --- DIREITA: CONTEXTO (40%) --- */}
      <div className="hidden lg:flex lg:w-[40%] bg-muted/10 flex-col justify-start pt-32 px-12 xl:px-20 relative overflow-hidden border-l border-border">
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:invert"></div>
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 opacity-50 blur-[120px] rounded-full pointer-events-none"></div>

         <div className="relative z-10">
            <div className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                 <span className="text-xl font-bold text-primary">{step}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight leading-snug mb-5 transition-all duration-300">
                {currentInfo.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8 transition-all duration-300">
                {currentInfo.text}
            </p>
            <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl shadow-sm">
                <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">{currentInfo.highlight}</p>
            </div>
         </div>
         <div className="absolute bottom-10 left-12">
            <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-[0.2em]">Facillit Ecosystem</p>
         </div>
      </div>
    </div>
  );
}