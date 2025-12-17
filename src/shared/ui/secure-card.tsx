import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Globe,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/shared/utils/cn"; // Importar o utilitário cn

export function SecureEnvironmentCard() {
  return (
    <section
      aria-label="Ambiente seguro FacillIt"
      className={cn(
        "w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      )}
    >
      {/* Header */}
      <header className="flex items-start gap-4 pb-4 border-b border-gray-200">
        {/* Logo */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <span className="text-sm font-extrabold tracking-tight text-brand-purple">
            ID
          </span>
        </div>

        {/* Título */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900">
              FacillIt Account
            </h3>

            <span className="rounded-md border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-green">
              Conta oficial
            </span>
          </div>

          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            Um único identificador seguro para acessar todo o ecossistema
            <strong> FacillIt Hub</strong>, com controle centralizado,
            menos senhas e maior proteção dos seus dados.
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Status */}
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-gray-200 text-brand-green">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wide text-gray-500">
              Status de segurança
            </span>
            <span className="text-sm font-semibold text-gray-900">
              Ambiente protegido e validado
            </span>
          </div>
        </div>

        {/* Selos */}
        <div className="flex flex-wrap items-center justify-start gap-4 sm:justify-end">
          <SecurityBadge icon={Lock} label="Criptografia SSL" />
          <SecurityBadge icon={Globe} label="Padrão Global" />
          <SecurityBadge icon={Fingerprint} label="Identidade Única" />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-brand-green mt-0.5" />
          <p className="text-xs leading-relaxed text-gray-600">
            Seus dados são protegidos com criptografia ponta a ponta e seguem
            normas internacionais de segurança e privacidade.
          </p>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold text-brand-purple hover:underline"
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
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
      <Icon className="h-4 w-4 text-gray-500" />
      <span className="text-[11px] font-semibold text-gray-700">
        {label}
      </span>
    </div>
  );
}