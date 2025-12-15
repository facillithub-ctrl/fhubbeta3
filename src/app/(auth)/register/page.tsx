"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, User, Mail, Lock, CheckCircle2, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<"student" | "professional" | "enterprise" | null>(null);

  const handleNext = () => setStep((p) => p + 1);
  const handleBack = () => setStep((p) => p - 1);

  // Simulação de Criação de Conta
  const handleFinish = async () => {
    setLoading(true);
    // TODO: Chamada Supabase.auth.signUp()
    
    setTimeout(() => {
        setLoading(false);
        // Redireciona para o Onboarding Obrigatório
        router.push("/onboarding"); 
    }, 1500);
  };

  return (
    <div className="w-full max-w-[520px] mx-auto animate-in slide-in-from-right-8 duration-500">
      
      {/* Progresso */}
      <div className="mb-8 flex justify-center gap-2">
        {[1, 2, 3].map((s) => (
            <div key={s} className={cn("h-1.5 rounded-full transition-all duration-500", s <= step ? "w-8 bg-brand-purple" : "w-2 bg-gray-200")} />
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 md:p-10 relative overflow-hidden">
        
        {/* --- STEP 1: CREDENCIAIS --- */}
        {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Criar Facillit ID</h1>
                    <p className="text-gray-500 text-sm">Seu acesso único ao ecossistema.</p>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Nome" className="px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all" />
                        <input type="text" placeholder="Sobrenome" className="px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all" />
                    </div>
                    <div className="relative group">
                        <input type="email" placeholder="E-mail principal" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all" />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-purple transition-colors" />
                    </div>
                    <div className="relative group">
                        <input type="password" placeholder="Criar senha" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all" />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-purple transition-colors" />
                    </div>
                </div>

                <button onClick={handleNext} className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                    Continuar <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        )}

        {/* --- STEP 2: TIPO DE CONTA --- */}
        {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Seu Perfil</h1>
                    <p className="text-gray-500 text-sm">Personalizaremos sua experiência baseada nisso.</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {[
                        { id: 'student', icon: GraduationCap, title: 'Estudante', desc: 'Foco em estudos, redação e simulados.' },
                        { id: 'professional', icon: Briefcase, title: 'Profissional', desc: 'Gestão de carreira, rotina e finanças.' },
                        { id: 'enterprise', icon: Building2, title: 'Empresa / Escola', desc: 'Gestão de times, alunos e acessos.' },
                    ].map((type) => (
                        <button 
                            key={type.id}
                            onClick={() => setAccountType(type.id as any)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md",
                                accountType === type.id 
                                    ? "border-brand-green bg-green-50/50" 
                                    : "border-gray-100 bg-white hover:border-brand-green/30"
                            )}
                        >
                            <div className={cn("p-3 rounded-full shrink-0", accountType === type.id ? "bg-brand-green text-white" : "bg-gray-100 text-gray-500")}>
                                <type.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{type.title}</h3>
                                <p className="text-xs text-gray-500">{type.desc}</p>
                            </div>
                            {accountType === type.id && <CheckCircle2 className="w-5 h-5 text-brand-green ml-auto" />}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button onClick={handleBack} className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
                    <button disabled={!accountType} onClick={handleNext} className="flex-1 bg-brand-dark disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                        Avançar
                    </button>
                </div>
            </div>
        )}

        {/* --- STEP 3: REVISÃO (Confirmação Email Desativada por enquanto) --- */}
        {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 text-center py-4">
                <div className="w-20 h-20 bg-brand-gradient rounded-full mx-auto flex items-center justify-center shadow-xl shadow-brand-purple/30 animate-pulse">
                    <User className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">Tudo pronto!</h1>
                    <p className="text-gray-500 text-sm max-w-xs mx-auto">
                        Ao criar a conta, você concorda com os Termos de Serviço. O e-mail de confirmação será enviado posteriormente.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button onClick={handleBack} className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"><ArrowLeft className="w-5 h-5 text-gray-600" /></button>
                    <button onClick={handleFinish} className="flex-1 bg-brand-green text-brand-dark font-bold rounded-xl py-3.5 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        {loading ? "Criando ID..." : "Criar Minha Conta"}
                    </button>
                </div>
            </div>
        )}

      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Já possui ID? <Link href="/login" className="font-bold text-brand-purple hover:underline">Fazer Login</Link>
      </div>
    </div>
  );
}