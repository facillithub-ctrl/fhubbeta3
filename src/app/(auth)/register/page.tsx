"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";
import { FormError } from "@/shared/ui/form-error";
import { registerAction } from "./actions";

function PasswordRules() {
    return (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Requisitos de Segurança</p>
            <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1 h-1 rounded-full bg-gray-400" />
                    Mínimo de 6 caracteres
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-1 h-1 rounded-full bg-gray-400" />
                    Sugerimos: Letras e números
                </li>
            </ul>
        </div>
    )
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
        type="submit" 
        disabled={pending}
        className="w-full mt-4 bg-brand-dark hover:bg-black text-white font-bold text-sm py-4 rounded-xl shadow-none hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Criar ID Gratuito"}
        {!pending && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

const initialState = {
  success: false,
  error: undefined,
  inputs: undefined
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-gray-900 overflow-hidden">
      
      {/* --- COLUNA ESQUERDA: FORMULÁRIO (50%) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-[440px] animate-in slide-in-from-left-6 duration-700 py-6">
          
          <div className="mb-8">
             <div className="inline-flex items-center gap-3 mb-6 group cursor-default">
                <div className="w-10 h-10 bg-brand-purple text-white rounded-xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105">
                    F
                </div>
                <div>
                    <h2 className="text-sm font-bold text-gray-900 leading-none tracking-tight">Facillit ID</h2>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Criar Conta</p>
                </div>
             </div>

             <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
                Comece sua jornada.
             </h1>
             <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Crie um único acesso para conectar estudos, trabalho e produtividade.
             </p>
          </div>

          <div className="mb-6 min-h-[20px]">
              <FormError error={state?.error} />
          </div>

          <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome</label>
                      <input 
                          id="firstName"
                          name="firstName"
                          type="text" 
                          required
                          defaultValue={state?.inputs?.firstName}
                          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300"
                          placeholder="Seu nome"
                      />
                  </div>
                  <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sobrenome</label>
                      <input 
                          id="lastName"
                          name="lastName"
                          type="text" 
                          required
                          defaultValue={state?.inputs?.lastName}
                          className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                          placeholder="Sobrenome"
                      />
                  </div>
              </div>

              <div className="space-y-1.5 group">
                  <label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">E-mail Principal</label>
                  <div className="relative">
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        defaultValue={state?.inputs?.email}
                        className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                        placeholder="nome@exemplo.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 group">
                      <label htmlFor="password" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">Senha</label>
                      <div className="relative">
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required 
                            minLength={6}
                            className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                            placeholder="******"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                      </div>
                  </div>

                  <div className="space-y-1.5 group">
                      <label htmlFor="confirmPassword" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-brand-purple transition-colors">Confirmar</label>
                      <div className="relative">
                        <input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password" 
                            required 
                            className="w-full pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300 hover:border-gray-300" 
                            placeholder="******"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-brand-purple transition-colors pointer-events-none" />
                      </div>
                  </div>
              </div>
              
              <PasswordRules />

              <SubmitButton />
          </form>

           <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500 mb-8">
                Já possui identidade? <Link href="/login" className="font-bold text-brand-purple hover:text-brand-dark hover:underline transition-colors">Fazer Login</Link>
              </p>
              
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <SecureEnvironmentCard />
              </div>
          </div>
        </div>
      </div>

      {/* --- COLUNA DIREITA: VISUAL --- */}
      <div className="hidden lg:flex flex-col relative bg-white items-center justify-start pt-20 px-12 order-2 border-l border-gray-100 overflow-hidden min-h-screen">
         <div className="relative z-10 w-full max-w-lg mb-12 animate-in slide-in-from-top-8 duration-1000">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight leading-snug mb-4">
                &ldquo;A simplicidade é o grau máximo de sofisticação. O Facillit unifica tudo o que você precisa em um só lugar.&rdquo;
            </h2>
            <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-brand-purple"></div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Manifesto 2025</p>
            </div>
         </div>

         {/* Cards decorativos */}
         <div className="w-full max-w-lg grid grid-cols-2 gap-4 relative z-10">
            <div className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-500 flex flex-col gap-3 group">
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-brand-purple group-hover:scale-105 transition-transform">
                     <span className="font-bold text-lg">H</span>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Hub Central</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Todos os seus apps em um dashboard.</p>
                </div>
            </div>
             <div className="p-6 rounded-3xl border border-gray-100 bg-white hover:border-gray-200 transition-colors duration-500 flex flex-col gap-3 group translate-y-8">
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-green-600 group-hover:scale-105 transition-transform">
                     <span className="font-bold text-lg">C</span>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">Colaboração</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Conecte-se com times e escolas.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}