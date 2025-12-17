// src/app/(public)/recursos/legal/page.tsx
import { Shield, Lock, Scale, HelpCircle } from "lucide-react";

export default function LegalIndexPage() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-700">
      <div className="inline-flex p-3 rounded-2xl bg-blue-50 border border-blue-100 mb-6">
        <Scale className="h-6 w-6 text-blue-600" />
      </div>
      
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
        Central de Transparência e Governança
      </h2>
      
      <p className="text-lg text-slate-600 leading-relaxed mb-10">
        Nesta central, você encontrará todos os documentos, diretrizes e políticas 
        que asseguram a integridade e a segurança de nossa plataforma. Navegue pelos 
        links ao lado para acessar os termos específicos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
          <Lock className="h-5 w-5 text-blue-500 mb-3" />
          <h3 className="font-bold text-slate-900 mb-2">Privacidade de Dados</h3>
          <p className="text-sm text-slate-500">
            Entenda como tratamos suas informações de acordo com a LGPD.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
          <Shield className="h-5 w-5 text-blue-500 mb-3" />
          <h3 className="font-bold text-slate-900 mb-2">Segurança Cibernética</h3>
          <p className="text-sm text-slate-500">
            Nossos protocolos de defesa e proteção de ativos digitais.
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-white flex items-center gap-6">
        <HelpCircle className="h-10 w-10 text-blue-400 hidden sm:block" />
        <div>
          <h4 className="font-bold mb-1">Dúvidas Jurídicas?</h4>
          <p className="text-slate-400 text-sm">
            Se você não encontrou o que procurava, entre em contato com nosso time de 
            compliance através do e-mail legal@facillithub.com.
          </p>
        </div>
      </div>
    </div>
  );
}