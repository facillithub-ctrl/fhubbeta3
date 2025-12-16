// src/shared/ui/secure-card.tsx
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

/**
 * SecureEnvironmentCard
 * Objetivo UX:
 * - Construir confiança imediata (trust first)
 * - Explicar o valor do ID em 5 segundos
 * - Ser escaneável, elegante e silenciosamente premium
 */
export function SecureEnvironmentCard() {
  return (
    <section
      aria-label="Ambiente seguro FacillIt"
      className="relative w-full rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
    >
      {/* Glow sutil de fundo */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-green/5" />

      {/* Header */}
      <header className="relative flex items-start gap-4 pb-5 mb-6 border-b border-gray-100">
        {/* Logo */}
        <div className="relative h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-brand-purple to-brand-green p-[1px]">
          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white">
            <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-purple/70">
              ID
            </span>
          </div>
        </div>

        {/* Título */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-gray-900">
              FacillIt Account
            </h3>
            <span className="rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-green">
              Oficial
            </span>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            Um único ID para acessar Education, Schools e Enterprise.
            Menos senhas, mais controle e portabilidade total.
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Status */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-100 bg-white text-brand-green shadow-sm">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Status
            </span>
            <span className="text-xs font-bold text-gray-900">
              Ambiente Seguro
            </span>
          </div>
        </div>

        {/* Selos */}
        <div className="flex h-full items-center justify-start sm:justify-end gap-3">
          <SecurityBadge icon={Lock} label="SSL" />
          <Divider />
          <SecurityBadge icon={Globe} label="Global" />
          <Divider />
          <SecurityBadge icon={Fingerprint} label="Unique" />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="relative mt-6 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand-green" />
          <p className="text-[11px] font-medium text-gray-400">
            Criptografia ponta a ponta e conformidade com padrões globais.
          </p>
        </div>

        <span className="flex items-center gap-1 text-[11px] font-semibold text-brand-purple">
          Saiba mais
          <ArrowRight className="h-3 w-3" />
        </span>
      </footer>
    </section>
  );
}

/* ============================ */

function SecurityBadge({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div
      className="group flex flex-col items-center gap-1"
      aria-label={label}
    >
      <div className="rounded-lg p-2 text-gray-400 transition-all group-hover:bg-purple-50 group-hover:text-brand-purple">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-6 w-px bg-gray-200" />;
}
