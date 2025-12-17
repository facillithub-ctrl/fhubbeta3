"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock, Loader2, ArrowLeft, Check, GraduationCap, Briefcase, Rocket } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";
import { FormError } from "@/shared/ui/form-error";
import { loginAction } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
        type="submit" 
        disabled={pending}
        className="w-full bg-brand-dark hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-none hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Acessar Hub"}
        {!pending && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

const initialState = {
  success: false,
  error: undefined,
  inputs: undefined
};

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen bg-white w-full grid grid-cols-1 lg:grid-cols-2 font-sans text-gray-900">
      
      {/* --- COLUNA ESQUERDA: LOGIN FORM --- */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-12 order-1 relative z-10 bg-white">
        <div className="w-full max-w-[400px] animate-in slide-in-from-left-4 duration-500">
            
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-brand-purple mb-10 transition-colors group">
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center bg-white hover:border-brand-purple/30 transition-colors">
                    <ArrowLeft className="w-3 h-3" />
                </div>
                Voltar ao Início
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                  Bem-vindo de volta.
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  Acesse seu Hub e continue sua jornada.
                </p>
            </div>

            {/* Novo Componente de Erro */}
            <div className="mb-6">
               <FormError error={state?.error} />
            </div>

            <form action={formAction} className="space-y-5">
                <div className="space-y-1.5 group">
                     <label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">E-mail ou ID</label>
                     <div className="relative">
                        <input 
                            id="email"
                            name="email" 
                            type="email" 
                            required
                            defaultValue={state?.inputs?.email} // Mantém o valor
                            className="w-full pl-4 pr-10 py-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300 text-gray-900"
                            placeholder="seu@email.com"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                     </div>
                </div>

                <div className="space-y-1.5 group">
                    <label htmlFor="password" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">Senha</label>
                    <div className="relative">
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required
                            className="w-full pl-4 pr-10 py-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300 text-gray-900"
                            placeholder="••••••••"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center justify-between py-1">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                        <div className="relative flex items-center">
                            <input type="checkbox" name="remember" className="peer sr-only" />
                            <div className="w-4 h-4 border border-gray-300 rounded peer-checked:bg-brand-purple peer-checked:border-brand-purple transition-all bg-white"></div>
                            <span className="absolute text-brand-purple opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none flex items-center justify-center inset-0">
                                <Check className="w-3 h-3 text-white" />
                            </span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 group-hover:text-gray-800 transition-colors">Manter conectado</span>
                    </label>

                    <Link href="/forgot-password" className="text-xs font-bold text-brand-purple hover:text-brand-dark hover:underline transition-colors">
                        Recuperar senha
                    </Link>
                </div>

                <SubmitButton />
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 mb-4">Ainda não possui Facillit ID?</p>
                <Link 
                    href="/register" 
                    className="inline-flex w-full py-3.5 items-center justify-center font-bold text-xs text-brand-purple bg-white border border-gray-200 rounded-xl hover:border-brand-purple hover:text-brand-dark transition-all duration-300"
                >
                    Criar meu ID Agora
                </Link>
            </div>

            <div className="mt-10 opacity-90 hover:opacity-100 transition-opacity">
                <SecureEnvironmentCard />
            </div>
        </div>
      </div>

      {/* --- COLUNA DIREITA (Visual) --- */}
      <div className="hidden lg:flex flex-col relative bg-white items-center justify-start pt-24 p-12 order-2 border-l border-gray-100 overflow-hidden">
         <div className="relative z-10 text-center max-w-lg animate-in slide-in-from-right-8 duration-1000">
            <div className="w-32 h-32 bg-white border border-gray-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 transform hover:scale-105 transition-transform duration-500">
                <Image src="/assets/images/accont.svg" alt="ID" width={80} height={80} className="object-contain" priority/>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.15]">
                Um único ID.<br/>
                <span className="text-brand-purple">Infinitas possibilidades.</span>
            </h2>
            <p className="text-base text-gray-500 leading-relaxed font-medium mb-12 max-w-md mx-auto">
                Conecte seus estudos, gerencie sua produtividade e acesse recursos corporativos. O Facillit Account é sua chave mestra.
            </p>
            <div className="flex justify-center gap-6">
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:border-brand-purple/20 transition-colors">
                        <GraduationCap className="w-7 h-7 text-brand-purple" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Education</span>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:border-brand-purple/20 transition-colors delay-75">
                        <Briefcase className="w-7 h-7 text-brand-purple" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enterprise</span>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:border-brand-purple/20 transition-colors delay-150">
                        <Rocket className="w-7 h-7 text-brand-purple" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Startups</span>
                </div>
            </div>
         </div>
         <div className="absolute bottom-10 text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            Facillit Ecosystem &copy; 2025
         </div>
      </div>
    </div>
  );
}