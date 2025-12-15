"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Lock, Scale, Fingerprint } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { OnboardingData } from "@/types/onboarding";

// Componentes dos Passos
import StepIdentity from "./_components/step-identity";
import StepLocation from "./_components/step-location";
import StepProfile from "./_components/step-profile";
import StepModules from "./_components/step-modules";
import StepAI from "./_components/step-ai";

const steps = [
  { id: 1, label: "Identidade" },
  { id: 2, label: "Localização" },
  { id: 3, label: "Objetivo" },
  { id: 4, label: "Apps" },
  { id: 5, label: "Inteligência" }
];

export default function OnboardingOrchestrator() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Estado Centralizado com Tipagem Forte
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
    // Simulação de delay para "Configurando seu Hub..."
    setTimeout(() => {
      setIsLoading(false);
      router.push("/select-hub");
    }, 2500);
  };

  const progressPercentage = (step / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans selection:bg-brand-purple/20 selection:text-brand-purple flex flex-col relative pb-32">
      
      {/* --- HEADER (Top Bar com Logo Account) --- */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50 h-24 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            
            {/* Logo Account em Destaque */}
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center group hover:scale-105 transition-transform">
                    <Image 
                        src="/assets/images/accont.svg" 
                        alt="Facillit Account" 
                        width={32} 
                        height={32} 
                        className="object-contain" 
                        priority
                    />
                </div>
                <div className="hidden sm:block">
                    <h1 className="text-lg font-extrabold text-gray-900 leading-none tracking-tight">Facillit Account</h1>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-1">Configuração de ID</p>
                </div>
            </div>

            {/* Stepper Visual Horizontal */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-1 group cursor-default">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                            step === s.id ? "border-brand-purple text-brand-purple bg-purple-50 scale-110" : 
                            step > s.id ? "bg-brand-green border-brand-green text-white" : "border-gray-200 text-gray-300 bg-white"
                        )}>
                            {step > s.id ? <CheckCircle2 className="w-5 h-5"/> : s.id}
                        </div>
                        <span className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", step === s.id ? "text-brand-purple" : "text-gray-300")}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Ajuda */}
            <button className="text-xs font-bold text-gray-400 hover:text-brand-purple transition-colors uppercase tracking-wider border border-gray-200 px-4 py-2 rounded-full hover:bg-white hover:shadow-sm">
                Ajuda
            </button>
        </div>

        {/* Linha de Progresso Gradiente */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-100">
            <div 
                className="h-full bg-brand-gradient shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-700 ease-out" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
      </header>

      {/* --- ÁREA PRINCIPAL (Centralizada) --- */}
      <main className="flex-1 pt-36 px-4 flex flex-col items-center justify-start">
        
        {/* Card Principal do Wizard */}
        <div className="w-full max-w-4xl bg-white rounded-[40px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-14 animate-in slide-in-from-bottom-4 duration-700 relative z-10 mb-8">
            {step === 1 && <StepIdentity data={formData} update={updateData} onNext={nextStep} />}
            {step === 2 && <StepLocation data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <StepProfile data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
            {step === 4 && <StepModules data={formData} update={updateData} onNext={nextStep} onBack={prevStep} />}
            {step === 5 && <StepAI data={formData} update={updateData} onBack={prevStep} onFinish={finishOnboarding} isLoading={isLoading} />}
        </div>

        {/* --- CARD DE SEGURANÇA FIXO (Abaixo do Card Principal) --- */}
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 delay-300 duration-1000 mb-8">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-sm hover:shadow-md transition-shadow cursor-default group">
                
                {/* Ícone de Escudo */}
                <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-full text-brand-green shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-6 h-6" />
                </div>

                {/* Texto de Confiança */}
                <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wide flex items-center justify-center md:justify-start gap-2">
                        Ambiente Seguro <span className="w-1 h-1 bg-gray-300 rounded-full"></span> Facillit Account
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                        Garantimos total segurança e autonomia sobre seus dados, em estrita conformidade com as leis vigentes.
                    </p>
                </div>

                {/* Ícones de Compliance */}
                <div className="flex items-center gap-5 text-gray-300 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                    <div className="flex flex-col items-center gap-1 group/icon" title="Criptografia SSL">
                        <Lock className="w-5 h-5 group-hover/icon:text-brand-purple transition-colors" />
                        <span className="text-[9px] font-bold uppercase">SSL</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/icon" title="Jurídico">
                        <Scale className="w-5 h-5 group-hover/icon:text-brand-purple transition-colors" />
                        <span className="text-[9px] font-bold uppercase">Legal</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 group/icon" title="Identidade Única">
                        <Fingerprint className="w-5 h-5 group-hover/icon:text-brand-purple transition-colors" />
                        <span className="text-[9px] font-bold uppercase">ID</span>
                    </div>
                </div>

            </div>
        </div>

      </main>
    </div>
  );
}