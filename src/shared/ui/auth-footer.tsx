import Link from "next/link";
import { ShieldCheck, Globe, Lock } from "lucide-react";

export function AuthFooter() {
  return (
    <footer className="w-full py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      
      {/* Links Principais */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-6 text-sm text-gray-500 font-medium">
        <Link href="/help" className="hover:text-brand-purple transition-colors">Central de Ajuda</Link>
        <Link href="/privacy" className="hover:text-brand-purple transition-colors">Privacidade de Dados</Link>
        <Link href="/terms" className="hover:text-brand-purple transition-colors">Termos de Uso</Link>
        <Link href="/status" className="hover:text-brand-purple transition-colors flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Status do Sistema
        </Link>
      </div>

      {/* Selos de Confiança e Copyright */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                <Lock className="w-3 h-3" /> SSL Secured
            </div>
            <div className="w-px h-3 bg-gray-300"></div>
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                <ShieldCheck className="w-3 h-3" /> GDPR Compliant
            </div>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Facillit Hub Inc. • ID Único Global
        </p>
      </div>
    </footer>
  );
}