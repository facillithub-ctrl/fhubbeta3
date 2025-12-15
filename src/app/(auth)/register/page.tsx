"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, User, Mail, Lock, MapPin, Heart, GraduationCap, Briefcase, Building2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";

// --- DADOS PARA LISTAS (Dropdowns) ---
const genderOptions = ["Feminino", "Masculino", "Não-binário", "Gênero Fluido", "Agênero", "Prefiro não dizer"];
const sexualityOptions = ["Heterossexual", "Homossexual", "Bissexual", "Pansexual", "Assexual", "Prefiro não dizer"];
const schoolYears = ["Ensino Fundamental I", "Ensino Fundamental II", "Ensino Médio - 1º Ano", "Ensino Médio - 2º Ano", "Ensino Médio - 3º Ano", "Pré-Vestibular", "Ensino Superior"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<"student" | "professional" | "enterprise" | null>(null);

  // Controle de avanço
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="w-full max-w-[600px] mx-auto animate-in slide-in-from-right-8 duration-500">
      
      {/* Barra de Progresso */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
            <span className={cn("text-xs font-bold uppercase tracking-widest", step >= 1 ? "text-brand-purple" : "text-gray-300")}>Conta</span>
            <span className={cn("text-xs font-bold uppercase tracking-widest", step >= 2 ? "text-brand-purple" : "text-gray-300")}>Pessoal</span>
            <span className={cn("text-xs font-bold uppercase tracking-widest", step >= 3 ? "text-brand-purple" : "text-gray-300")}>Perfil</span>
        </div>
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
                className="h-full bg-brand-gradient transition-all duration-500 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
            ></div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative overflow-hidden">
        
        {/* --- STEP 1: CREDENCIAIS --- */}
        {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Vamos começar</h1>
                    <p className="text-gray-500">Crie suas credenciais de acesso ao Hub.</p>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input type="email" placeholder="Seu melhor e-mail" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none" />
                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input type="password" placeholder="Crie uma senha forte" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none" />
                        <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="relative">
                        <input type="password" placeholder="Confirme a senha" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple transition-all outline-none" />
                        <Check className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>

                <button onClick={nextStep} className="w-full bg-brand-dark text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                    Continuar <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        )}

        {/* --- STEP 2: DADOS PESSOAIS (COMPLETO) --- */}
        {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Sobre Você</h1>
                    <p className="text-gray-500">Para personalizarmos sua experiência.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nome" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-purple/50" />
                    <input type="text" placeholder="Sobrenome" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-purple/50" />
                </div>

                {/* Identidade e Inclusão */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl appearance-none text-gray-600 outline-none focus:ring-2 focus:ring-brand-purple/50 cursor-pointer">
                            <option value="" disabled selected>Identidade de Gênero</option>
                            {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <User className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl appearance-none text-gray-600 outline-none focus:ring-2 focus:ring-brand-purple/50 cursor-pointer">
                            <option value="" disabled selected>Orientação (Opcional)</option>
                            {sexualityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <Heart className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Endereço Simplificado */}
                <div className="relative">
                    <input type="text" placeholder="CEP" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-brand-purple/50" />
                    <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="flex gap-4">
                    <button onClick={prevStep} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button onClick={nextStep} className="flex-1 bg-brand-dark text-white font-bold rounded-full hover:shadow-xl hover:scale-[1.02] transition-all">
                        Próximo
                    </button>
                </div>
            </div>
        )}

        {/* --- STEP 3: TIPO DE CONTA (PERSONALIZADO) --- */}
        {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Seu Perfil Principal</h1>
                    <p className="text-gray-500">Como você vai usar o Facillit Hub?</p>
                </div>

                {/* Seleção de Tipo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button 
                        onClick={() => setAccountType("student")}
                        className={cn("p-4 rounded-2xl border-2 text-center transition-all hover:shadow-md", accountType === "student" ? "border-brand-purple bg-purple-50" : "border-gray-100 bg-white hover:border-brand-purple/30")}
                    >
                        <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 text-brand-purple"><GraduationCap className="w-5 h-5"/></div>
                        <span className="font-bold text-gray-800 text-sm">Estudante</span>
                    </button>
                    <button 
                        onClick={() => setAccountType("professional")}
                        className={cn("p-4 rounded-2xl border-2 text-center transition-all hover:shadow-md", accountType === "professional" ? "border-brand-purple bg-purple-50" : "border-gray-100 bg-white hover:border-brand-purple/30")}
                    >
                        <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 text-brand-green"><Briefcase className="w-5 h-5"/></div>
                        <span className="font-bold text-gray-800 text-sm">Individual</span>
                    </button>
                    <button 
                        onClick={() => setAccountType("enterprise")}
                        className={cn("p-4 rounded-2xl border-2 text-center transition-all hover:shadow-md", accountType === "enterprise" ? "border-brand-purple bg-purple-50" : "border-gray-100 bg-white hover:border-brand-purple/30")}
                    >
                        <div className="w-10 h-10 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-2 text-blue-600"><Building2 className="w-5 h-5"/></div>
                        <span className="font-bold text-gray-800 text-sm">Instituição</span>
                    </button>
                </div>

                {/* CAMPOS CONDICIONAIS (A Mágica acontece aqui) */}
                {accountType === "student" && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                        <input type="text" placeholder="Nome da Escola / Faculdade" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50" />
                        <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50 text-gray-600 cursor-pointer">
                            <option value="" disabled selected>Sua Série / Ano</option>
                            {schoolYears.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                )}

                {accountType === "enterprise" && (
                    <div className="space-y-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                        <input type="text" placeholder="Nome da Empresa" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50" />
                        <input type="text" placeholder="CNPJ (Opcional)" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-purple/50" />
                    </div>
                )}

                <div className="flex gap-4 pt-2">
                    <button onClick={prevStep} className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="flex-1 bg-brand-gradient text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                        Finalizar Cadastro
                    </button>
                </div>
            </div>
        )}

      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Já tem um ID? <Link href="/login" className="font-bold text-brand-purple hover:underline">Fazer Login</Link>
      </div>

    </div>
  );
}