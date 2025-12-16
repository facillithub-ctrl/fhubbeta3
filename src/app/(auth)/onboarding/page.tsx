// src/app/(auth)/onboarding/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { OnboardingData } from "@/types/onboarding";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

// Componentes dos Passos
import StepIdentity from "./_components/step-identity";
import StepLocation from "./_components/step-location";
import StepProfile from "./_components/step-profile";
import StepModules from "./_components/step-modules";
import StepAI from "./_components/step-ai";

const steps = [
  { id: 1, label: "Identidade" },
  { id: 2, label: "Local" },
  { id: 3, label: "Objetivo" },
  { id: 4, label: "Apps" },
  { id: 5, label: "I.A." }
];

export default function OnboardingOrchestrator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  // Função tipada corretamente com Generic K
  const updateData = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep((prev) => prev - 1);
  };

  const finishOnboarding = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/select-hub");
    }, 2000);
  };

  const progressPercentage = (step / steps.length) * 100;

  return (
    // Clean White Theme
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col relative pb-32">
      
      {/* HEADER Minimalista Fixo */}
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 h-16 transition-all">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
            
            <div className="flex items-center gap-3 select-none">
               <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center text-white font-bold shadow-sm">F</div>
               <div className="h-4 w-[1px] bg-gray-200"></div>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Setup</span>
            </div>

            {/* Stepper Linear Elegante */}
            <div className="hidden md:flex items-center gap-1.5">
                {steps.map((s, index) => (
                    <div key={s.id} className="flex items-center">
                        <div className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300",
                            step === s.id ? "bg-brand-purple/5 text-brand-purple ring-1 ring-brand-purple/20" : 
                            step > s.id ? "text-brand-green" : "text-gray-300"
                        )}>
                            <span className={cn(
                                "w-4 h-4 flex items-center justify-center rounded-full border text-[8px] transition-colors",
                                step === s.id ? "border-current" : 
                                step > s.id ? "border-brand-green bg-brand-green text-white" : "border-gray-300"
                            )}>
                                {step > s.id ? <CheckCircle2 className="w-full h-full" /> : s.id}
                            </span>
                            {s.label}
                        </div>
                        {/* Conector */}
                        {index < steps.length - 1 && (
                            <div className={cn("w-3 h-[1px] mx-1 transition-colors", step > s.id ? "bg-brand-green/30" : "bg-gray-100")}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Placeholder visual para balancear o layout */}
            <div className="w-20 hidden md:block"></div>
        </div>

        {/* Linha de Progresso Ultra Fina */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-50">
            <div className="h-full bg-brand-gradient shadow-[0_0_10px_rgba(66,4,126,0.2)] transition-all duration-700 ease-out" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-28 px-4 flex flex-col items-center justify-start">
        
        <div className="w-full max-w-3xl animate-in slide-in-from-bottom-6 duration-700 delay-100">
            
            {/* Título da Seção (Opcional, pode ser movido para dentro dos steps) */}
            <div className="mb-8 text-center md:text-left border-b border-gray-50 pb-4">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    {step === 1 && "Vamos criar sua identidade."}
                    {step === 2 && "Onde você está no mundo?"}
                    {step === 3 && "Qual é o seu foco principal?"}
                    {step === 4 && "Escolha suas ferramentas."}
                    {step === 5 && "Calibrando sua Inteligência."}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Passo {step} de {steps.length} — {steps[step-1].label}
                </p>
            </div>

            {/* Conteúdo Dinâmico do Passo */}
            <div className="min-h-[400px] mb-12">
                {step === 1 && <StepIdentity data={formData} update={updateData} onNext={nextStep} />}
                {step === 2 && <StepLocation data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 3 && <StepProfile data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 4 && <StepModules data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
                {step === 5 && <StepAI data={formData} update={updateData} onBack={prevStep} onFinish={finishOnboarding} isLoading={isLoading} />}
            </div>

            {/* Divisor Visual */}
            <div className="w-full h-[1px] bg-gray-100 mb-10"></div>

            {/* Novo Card de Segurança */}
            <div className="max-w-xl mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300">
                <SecureEnvironmentCard />
            </div>

        </div>
      </main>
    </div>
  );
}