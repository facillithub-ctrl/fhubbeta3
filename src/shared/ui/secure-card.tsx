import React from "react";
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Globe,
  CheckCircle2,
  ArrowRight,
  Activity
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function SecureEnvironmentCard() {
  return (
    <section
      aria-label="Ambiente seguro FacillIt"
      className={cn(
        "group w-full rounded-2xl border border-border bg-card p-1 shadow-sm transition-all duration-500 hover:shadow-md hover:border-primary/20"
      )}
    >
      {/* Container Interno */}
      <div className="rounded-xl bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-900 dark:to-zinc-900/50 p-5 sm:p-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-start gap-5 pb-5 border-b border-border/60">
          {/* Logo / Ícone Principal */}
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5 border border-primary/10 text-primary shadow-sm">
             <ShieldCheck className="w-6 h-6" />
             {/* Indicador de Status Ativo (Bolinha Verde) */}
             <div className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-zinc-900"></span>
             </div>
          </div>

          {/* Textos */}
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                FacillIt Account
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-muted-foreground border border-border font-mono">ID-v1.0</span>
              </h3>
              
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <Activity className="w-3 h-3 text-green-600 dark:text-green-400" />
                <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-wider">Monitorado</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Seu passaporte digital unificado. Acesso centralizado ao ecossistema <strong className="text-foreground font-semibold">FacillIt Hub</strong> com criptografia de nível militar.
            </p>
          </div>
        </header>

        {/* Corpo: Badges e Infos */}
        <div className="mt-5 flex flex-col sm:flex-row gap-4">
            {/* Coluna de Status */}
            <div className="flex-1 grid grid-cols-2 gap-2">
                <SecurityStat label="Criptografia" value="AES-256" />
                <SecurityStat label="Sessão" value="Protegida" />
            </div>

            {/* Badges Visuais */}
            <div className="flex flex-wrap gap-2 sm:justify-end sm:max-w-[50%]">
                <SecurityBadge icon={Lock} label="SSL Ativo" />
                <SecurityBadge icon={Fingerprint} label="Biometria" />
                <SecurityBadge icon={Globe} label="Global Access" />
            </div>
        </div>

        {/* Rodapé Minimalista */}
        <footer className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
           <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span>Conformidade com LGPD & GDPR</span>
           </div>

           <button type="button" className="group/btn flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors">
              Detalhes de Segurança
              <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
           </button>
        </footer>
      </div>
    </section>
  );
}

// --- SUB-COMPONENTES ---

function SecurityBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background/50 hover:bg-background hover:border-primary/30 transition-all cursor-default">
      <Icon className="h-3 w-3 text-muted-foreground" />
      <span className="text-[10px] font-medium text-foreground whitespace-nowrap">{label}</span>
    </div>
  );
}

function SecurityStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col px-3 py-2 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-colors">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</span>
            <span className="text-xs font-bold text-foreground">{value}</span>
        </div>
    )
}