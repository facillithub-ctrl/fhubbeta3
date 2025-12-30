"use client";

import { useState, useActionState } from "react";
import React from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { 
  ArrowRight, Mail, Lock, Loader2, 
  ShieldCheck, Zap, LayoutGrid, Star, Check 
} from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";
import { FormError } from "@/shared/ui/form-error";
import { registerAction } from "./actions";

// --- COMPONENTES AUXILIARES (FORA DO COMPONENTE PRINCIPAL) ---

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-black/5 transition-colors duration-200">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-foreground text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

const RuleItem = ({ met, text }: { met: boolean, text: string }) => (
    <div className={`flex items-center gap-2 text-xs transition-colors duration-300 ${met ? "text-green-600 font-medium" : "text-muted-foreground"}`}>
        {met ? (
            <Check className="w-3.5 h-3.5 shrink-0" />
        ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 ml-1 mr-1" />
        )}
        {text}
    </div>
);

function PasswordRules({ password }: { password: string }) {
    const hasMinLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    return (
        <div className="mt-3 p-4 bg-muted/20 rounded-xl border border-border/50">
            <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-foreground uppercase tracking-wider">Requisitos de Segurança</p>
                <Lock className={`w-3 h-3 ${hasMinLength && hasUpperCase && hasNumber && hasSymbol ? "text-green-600" : "text-muted-foreground"}`} />
            </div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                <RuleItem met={hasMinLength} text="Mínimo 6 caracteres" />
                <RuleItem met={hasUpperCase} text="1 Letra Maiúscula" />
                <RuleItem met={hasNumber} text="1 Número" />
                <RuleItem met={hasSymbol} text="1 Símbolo (!@#)" />
            </div>
        </div>
    )
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
        type="submit" 
        disabled={pending}
        className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm py-4 rounded-xl hover:translate-y-[-1px] active:translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

// --- PÁGINA PRINCIPAL ---
export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);
  const [passwordInput, setPasswordInput] = useState(""); 

  return (
    <div className="min-h-screen w-full flex bg-background font-sans text-foreground">
      
      {/* --- COLUNA ESQUERDA: FORMULÁRIO (50%) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-12 px-6 sm:px-12 relative z-10 border-r border-border bg-background">
        <div className="w-full max-w-[420px] animate-in slide-in-from-left-6 duration-700">
          
          <div className="mb-8">
             <div className="inline-flex items-center group cursor-default">
                <img 
                 src="/assets/images/accoutgradient.svg" 
                 alt="Facillit ID" 
                 className="h-24 w-auto mb-1" 
                 />
             </div>
             <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">
                Comece sua jornada.
             </h1>
             <p className="text-sm text-muted-foreground leading-relaxed">
                Preencha seus dados para criar seu ID único.
             </p>
          </div>

          <div className="mb-1 min-h-[2px]">
              <FormError error={state?.error} />
          </div>

          <form action={formAction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                      <label htmlFor="firstName" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Nome</label>
                      <input 
                          id="firstName"
                          name="firstName"
                          type="text" 
                          required
                          defaultValue={state?.inputs?.firstName}
                          className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground"
                          placeholder="Nome"
                      />
                  </div>
                  <div className="space-y-1.5">
                      <label htmlFor="lastName" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Sobrenome</label>
                      <input 
                          id="lastName"
                          name="lastName"
                          type="text" 
                          required
                          defaultValue={state?.inputs?.lastName}
                          className="w-full px-4 py-3 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                          placeholder="Sobrenome"
                      />
                  </div>
              </div>

              <div className="space-y-1.5 group">
                  <label htmlFor="email" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">E-mail</label>
                  <div className="relative">
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        defaultValue={state?.inputs?.email}
                        className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                        placeholder="nome@exemplo.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5 group">
                      <label htmlFor="password" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Senha</label>
                      <div className="relative">
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required 
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                            placeholder="******"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                      </div>
                  </div>

                  <div className="space-y-1.5 group">
                      <label htmlFor="confirmPassword" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Confirmar Senha</label>
                      <div className="relative">
                        <input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password" 
                            required 
                            className="w-full pl-4 pr-10 py-3 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                            placeholder="******"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                      </div>
                  </div>
              </div>
              
              <PasswordRules password={passwordInput} />

              <SubmitButton />
          </form>

           <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-6">
                Já possui identidade? <Link href="/login" className="font-bold text-primary hover:text-primary/80 hover:underline transition-colors">Fazer Login</Link>
              </p>
              
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <SecureEnvironmentCard />
              </div>
          </div>
        </div>
      </div>

      {/* --- COLUNA DIREITA: AJUSTADA PARA NÃO CORTAR --- */}
      {/* overflow-y-auto garante que se a tela for pequena, o usuário pode rolar para ver o final */}
      <div className="hidden lg:flex lg:w-1/2 flex-col bg-muted/5 h-screen sticky top-0 border-l border-border overflow-y-auto no-scrollbar">
         
         {/* Container interno para distribuir o espaço (p-8 em vez de p-12 para ganhar espaço) */}
         <div className="flex flex-col justify-between min-h-full p-8 lg:p-10 max-w-lg mx-auto">
             
             {/* Topo */}
             <div className="animate-in slide-in-from-right-8 duration-1000 mt-4">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-[1.15] mb-4">
                    Mais do que uma conta,<br /> 
                    <span className="text-primary">seu passaporte global.</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                    Centralize sua vida digital com segurança militar. O Facillit ID conecta você a escolas, empresas e ferramentas de produtividade.
                </p>
             </div>

             {/* Meio (Vantagens) - espaçamento reduzido */}
             <div className="space-y-3 py-6">
                 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-3">Vantagens Exclusivas</p>
                 <FeatureItem 
                     icon={LayoutGrid} 
                     title="Integração Universal" 
                     description="Acesse todas as plataformas do ecossistema sem trocar de login." 
                 />
                 <FeatureItem 
                     icon={Zap} 
                     title="Dados em Tempo Real" 
                     description="Suas informações sincronizadas instantaneamente em qualquer dispositivo." 
                 />
                 <FeatureItem 
                     icon={ShieldCheck} 
                     title="Segurança Avançada" 
                     description="Criptografia de ponta a ponta e monitoramento de acessos suspeitos." 
                 />
             </div>

             {/* Fundo (Depoimento) */}
             <div className="border-t border-border/50 pt-6">
                 <div className="flex gap-1 mb-3 text-primary">
                    <Star className="w-4 h-4 fill-primary" />
                    <Star className="w-4 h-4 fill-primary" />
                    <Star className="w-4 h-4 fill-primary" />
                    <Star className="w-4 h-4 fill-primary" />
                    <Star className="w-4 h-4 fill-primary" />
                 </div>
                 <blockquote className="text-sm font-medium text-foreground italic leading-relaxed">
                    O Facillit mudou a forma como nossa organização gerencia acessos. Simples, rápido e extremamente seguro.
                 </blockquote>
                 <div className="mt-4 flex items-center justify-between">
                     <p className="text-xs font-bold text-muted-foreground">
                        — Diretor de Tecnologia, EdTech Solutions
                     </p>
                     <div className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                        Trust Pilot 5.0
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}