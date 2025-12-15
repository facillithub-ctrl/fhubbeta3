"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { OnboardingData } from "@/types/onboarding"; // Importando tipos reais

// Componentes
import StepIdentity from "./_components/step-identity";
import StepLocation from "./_components/step-location";
import StepProfile from "./_components/step-profile";
import StepModules from "./_components/step-modules";
import StepAI from "./_components/step-ai";

export default function OnboardingOrchestrator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Estado Inicial Tipado
  const [formData, setFormData] = useState<OnboardingData>({
    handle: "",
    profileImage: null,
    address: null,
    profileType: null,
    selectedModules: [],
    aiLevel: "intermediate",
    deviceTrusted: true,
    permissions: { recommendations: true, dataAnalysis: true }
  });

  const updateData = (key: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const finishOnboarding = async () => {
    setIsLoading(true);
    // Aqui entra a chamada real ao Supabase
    setTimeout(() => {
      setIsLoading(false);
      router.push("/select-hub");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans selection:bg-brand-purple/20 selection:text-brand-purple">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[750px] animate-in zoom-in-95 duration-500">
        
        {/* SIDEBAR GRADIENTE (Facillit ID Style) */}
        <div className="w-full md:w-[340px] bg-brand-gradient p-10 text-white flex flex-col justify-between relative shrink-0 overflow-hidden">
            
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/grid-pattern.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            {/* Header da Sidebar */}
            <div className="relative z-10 text-center md:text-left">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/20 mx-auto md:mx-0">
                     <Image src="/assets/images/accont.svg" alt="Account" width={48} height={48} className="object-contain" />
                </div>
                <h2 className="text-3xl font-extrabold mb-1 tracking-tight">Facillit ID</h2>
                <p className="text-white/80 text-sm font-medium">Configuração da Identidade Única</p>
            </div>

            {/* Steps Visual */}
            <div className="relative z-10 space-y-6 my-8 hidden md:block">
                {[
                    "Identidade Digital",
                    "Localização Global",
                    "Perfil & Objetivo",
                    "Seus Módulos",
                    "Inteligência Artificial"
                ].map((label, index) => {
                    const stepNum = index + 1;
                    const isActive = step === stepNum;
                    const isCompleted = step > stepNum;

                    return (
                        <div key={stepNum} className="flex items-center gap-4 group">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500",
                                isActive ? "bg-white text-brand-purple border-white scale-110 shadow-lg" : 
                                isCompleted ? "bg-brand-green border-brand-green text-brand-dark" : "border-white/20 text-white/40"
                            )}>
                                {isCompleted ? <Check className="w-5 h-5"/> : stepNum}
                            </div>
                            <span className={cn("text-sm font-medium transition-colors duration-300", isActive ? "text-white font-bold translate-x-1" : isCompleted ? "text-white/90" : "text-white/40")}>
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Footer Sidebar */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                    <ShieldCheck className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                    <p className="text-xs text-white font-bold uppercase tracking-wider">Ambiente Seguro</p>
                    <p className="text-[10px] text-white/60">Criptografia de ponta a ponta</p>
                </div>
            </div>
        </div>

        {/* ÁREA DE CONTEÚDO */}
        <div className="flex-1 flex flex-col relative bg-white">
            {/* Header Mobile dos Steps */}
            <div className="md:hidden flex justify-center p-4 border-b border-gray-100">
                <span className="text-xs font-bold text-brand-purple uppercase tracking-widest">Passo {step} de 5</span>
            </div>

            <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                {step === 1 && <StepIdentity data={formData} update={updateData} onNext={nextStep} />}
                {step === 2 && <StepLocation data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 3 && <StepProfile data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 4 && <StepModules data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 5 && <StepAI data={formData} update={updateData} onBack={prevStep} onFinish={finishOnboarding} isLoading={isLoading} />}
            </div>
        </div>

      </div>
    </div>
  );
}