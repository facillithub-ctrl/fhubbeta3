import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Globe,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

export function SecureEnvironmentCard() {
  return (
    <section
      aria-label="Ambiente seguro FacillIt"
      className={cn(
        // Mudanças para Acessibilidade:
        // bg-white -> bg-card (Fundo do cartão adapta ao tema)
        // border-gray-200 -> border-border (Borda adapta ao tema)
        "w-full rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 transition-colors duration-300"
      )}
    >
      {/* Header */}
      <header className="flex items-start gap-4 pb-4 border-b border-border">
        {/* Logo */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-primary">
          <span className="text-sm font-extrabold tracking-tight">
            ID
          </span>
        </div>

        {/* Título */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-card-foreground">
              FacillIt Account
            </h3>

            {/* Badge de Verificado (Mantendo verde, mas adaptável ao dark mode) */}
            <span className="rounded-md border border-green-200/50 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
              Conta oficial
            </span>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Um único identificador seguro para acessar todo o ecossistema
            <strong className="text-foreground ml-1">FacillIt Hub</strong>, com controle centralizado,
            menos senhas e maior proteção dos seus dados.
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Status */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background border border-border text-green-600 dark:text-green-400">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Status de segurança
            </span>
            <span className="text-sm font-semibold text-foreground">
              Ambiente protegido
            </span>
          </div>
        </div>

        {/* Selos */}
        <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end">
          <SecurityBadge icon={Lock} label="SSL Seguro" />
          <SecurityBadge icon={Globe} label="Global" />
          <SecurityBadge icon={Fingerprint} label="ID Único" />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Dados protegidos com criptografia ponta a ponta e normas internacionais.
          </p>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 hover:underline transition-colors shrink-0"
          )}
        >
          Saiba mais
          <ArrowRight className="h-3 w-3" />
        </button>
      </footer>
    </section>
  );
}

function SecurityBadge({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-colors hover:border-primary/30">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-[10px] font-semibold text-foreground">
        {label}
      </span>
    </div>
  );
}