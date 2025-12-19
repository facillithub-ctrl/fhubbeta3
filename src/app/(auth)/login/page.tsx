"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Lock, Loader2, ArrowLeft, Check, GraduationCap, Briefcase, Rocket } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";
import { FormError } from "@/shared/ui/form-error";
import { loginAction } from "./actions";
import { cn } from "@/shared/utils/cn";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
        type="submit" 
        disabled={pending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
    <div className="min-h-screen bg-background w-full grid grid-cols-1 lg:grid-cols-2 font-sans text-foreground transition-colors duration-300">
      
      {/* --- COLUNA ESQUERDA: LOGIN FORM --- */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-12 order-1 relative z-10 bg-background">
        <div className="w-full max-w-[400px] animate-in slide-in-from-left-4 duration-500">
            
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-10 transition-colors group">
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card hover:border-primary/50 transition-colors">
                    <ArrowLeft className="w-3 h-3" />
                </div>
                Voltar ao Início
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">
                  Bem-vindo de volta.
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Acesse seu Hub e continue sua jornada.
                </p>
            </div>

            {/* Componente de Erro */}
            <div className="mb-6">
               <FormError error={state?.error} />
            </div>

            <form action={formAction} className="space-y-5">
                <div className="space-y-1.5 group">
                     <label htmlFor="email" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">E-mail ou ID</label>
                     <div className="relative">
                        <input 
                            id="email"
                            name="email" 
                            type="email" 
                            required
                            defaultValue={state?.inputs?.email}
                            className="w-full pl-4 pr-10 py-4 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground"
                            placeholder="seu@email.com"
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                     </div>
                </div>

                <div className="space-y-1.5 group">
                    <label htmlFor="password" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Senha</label>
                    <div className="relative">
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required
                            className="w-full pl-4 pr-10 py-4 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground"
                            placeholder="••••••••"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center justify-between py-1">
                    <label className="flex items-center gap-2 cursor-pointer group select-none">
                        <div className="relative flex items-center">
                            <input type="checkbox" name="remember" className="peer sr-only" />
                            <div className="w-4 h-4 border border-input rounded peer-checked:bg-primary peer-checked:border-primary transition-all bg-background"></div>
                            <span className="absolute text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none flex items-center justify-center inset-0">
                                <Check className="w-3 h-3" />
                            </span>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">Manter conectado</span>
                    </label>

                    <Link href="/forgot-password" className="text-xs font-bold text-primary hover:text-primary/80 hover:underline transition-colors">
                        Recuperar senha
                    </Link>
                </div>

                <SubmitButton />
            </form>

            <div className="mt-10 pt-8 border-t border-border text-center">
                <p className="text-xs text-muted-foreground mb-4">Ainda não possui Facillit ID?</p>
                <Link 
                    href="/register" 
                    className="inline-flex w-full py-3.5 items-center justify-center font-bold text-xs text-primary bg-background border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300"
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
      <div className="hidden lg:flex flex-col relative bg-muted/10 items-center justify-start pt-24 p-12 order-2 border-l border-border overflow-hidden">
         <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
         
         <div className="relative z-10 text-center max-w-lg animate-in slide-in-from-right-8 duration-1000">
            <div className="w-32 h-32 bg-card border border-border rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 transform hover:scale-105 transition-transform duration-500 shadow-sm">
                <Image src="/assets/images/accont.svg" alt="ID" width={80} height={80} className="object-contain" priority/>
            </div>
            <h2 className="text-4xl font-extrabold text-foreground mb-6 tracking-tight leading-[1.15]">
                Um único ID.<br/>
                <span className="text-primary">Infinitas possibilidades.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-medium mb-12 max-w-md mx-auto">
                Conecte seus estudos, gerencie sua produtividade e acesse recursos corporativos. O Facillit Account é sua chave mestra.
            </p>
            <div className="flex justify-center gap-6">
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                        <GraduationCap className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</span>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors delay-75">
                        <Briefcase className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Enterprise</span>
                </div>
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors delay-150">
                        <Rocket className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Startups</span>
                </div>
            </div>
         </div>
         <div className="absolute bottom-10 text-[10px] text-muted-foreground/50 font-bold uppercase tracking-[0.2em]">
            Facillit Ecosystem &copy; 2025
         </div>
      </div>
    </div>
  );
}