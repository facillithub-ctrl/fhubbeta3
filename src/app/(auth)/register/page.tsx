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
        <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Requisitos de Segurança</p>
            <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-xs text-muted-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    Mínimo de 6 caracteres
                </li>
                <li className="flex items-center gap-2 text-xs text-muted-foreground/80">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
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
        className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
    <div className="min-h-screen w-full flex bg-background font-sans text-foreground overflow-hidden transition-colors duration-300">
      
      {/* --- COLUNA ESQUERDA: FORMULÁRIO (50%) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 overflow-y-auto">
        <div className="w-full max-w-[440px] animate-in slide-in-from-left-6 duration-700 py-6">
          
          <div className="mb-8">
             <div className="inline-flex items-center gap-3 mb-6 group cursor-default">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-xl transition-transform group-hover:scale-105 shadow-sm">
                    F
                </div>
                <div>
                    <h2 className="text-sm font-bold text-foreground leading-none tracking-tight">Facillit ID</h2>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Criar Conta</p>
                </div>
             </div>

             <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-3">
                Comece sua jornada.
             </h1>
             <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Crie um único acesso para conectar estudos, trabalho e produtividade.
             </p>
          </div>

          <div className="mb-6 min-h-[20px]">
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
                          className="w-full px-4 py-3.5 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground"
                          placeholder="Seu nome"
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
                          className="w-full px-4 py-3.5 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                          placeholder="Sobrenome"
                      />
                  </div>
              </div>

              <div className="space-y-1.5 group">
                  <label htmlFor="email" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">E-mail Principal</label>
                  <div className="relative">
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        defaultValue={state?.inputs?.email}
                        className="w-full pl-4 pr-10 py-3.5 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                        placeholder="nome@exemplo.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 group">
                      <label htmlFor="password" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Senha</label>
                      <div className="relative">
                        <input 
                            id="password"
                            name="password"
                            type="password" 
                            required 
                            minLength={6}
                            className="w-full pl-4 pr-10 py-3.5 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                            placeholder="******"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                      </div>
                  </div>

                  <div className="space-y-1.5 group">
                      <label htmlFor="confirmPassword" className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Confirmar</label>
                      <div className="relative">
                        <input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password" 
                            required 
                            className="w-full pl-4 pr-10 py-3.5 bg-background border border-input rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground/50 hover:border-primary/50 text-foreground" 
                            placeholder="******"
                        />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                      </div>
                  </div>
              </div>
              
              <PasswordRules />

              <SubmitButton />
          </form>

           <div className="mt-8 pt-8 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-8">
                Já possui identidade? <Link href="/login" className="font-bold text-primary hover:text-primary/80 hover:underline transition-colors">Fazer Login</Link>
              </p>
              
              <div className="opacity-90 hover:opacity-100 transition-opacity">
                <SecureEnvironmentCard />
              </div>
          </div>
        </div>
      </div>

      {/* --- COLUNA DIREITA: VISUAL --- */}
      <div className="hidden lg:flex flex-col relative bg-muted/10 items-center justify-start pt-20 px-12 order-2 border-l border-border overflow-hidden min-h-screen">
         <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
         
         <div className="relative z-10 w-full max-w-lg mb-12 animate-in slide-in-from-top-8 duration-1000">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight leading-snug mb-4">
                &ldquo;A simplicidade é o grau máximo de sofisticação. O Facillit unifica tudo o que você precisa em um só lugar.&rdquo;
            </h2>
            <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-primary"></div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Manifesto 2025</p>
            </div>
         </div>

         {/* Cards decorativos */}
         <div className="w-full max-w-lg grid grid-cols-2 gap-4 relative z-10">
            <div className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors duration-500 flex flex-col gap-3 group shadow-sm">
                <div className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                     <span className="font-bold text-lg">H</span>
                </div>
                <div>
                    <h4 className="font-bold text-foreground text-sm">Hub Central</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">Todos os seus apps em um dashboard.</p>
                </div>
            </div>
             <div className="p-6 rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors duration-500 flex flex-col gap-3 group translate-y-8 shadow-sm">
                <div className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-green-600 group-hover:scale-105 transition-transform">
                     <span className="font-bold text-lg">C</span>
                </div>
                <div>
                    <h4 className="font-bold text-foreground text-sm">Colaboração</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">Conecte-se com times e escolas.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}