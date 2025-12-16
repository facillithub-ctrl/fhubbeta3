// src/shared/ui/secure-card.tsx
import { ShieldCheck, Lock, Fingerprint, Globe, CheckCircle2 } from "lucide-react";

export function SecureEnvironmentCard() {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 group cursor-default">
      
      {/* Cabeçalho com Identidade Visual */}
      <div className="flex items-start gap-5 mb-6 border-b border-gray-50 pb-5">
        <div className="relative w-12 h-12 shrink-0">
             {/* Logo Container */}
             <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-green rounded-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
             <div className="absolute inset-[1px] bg-white rounded-xl flex items-center justify-center border border-gray-100">
                <span className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-purple/80">
                    ID
                </span>
             </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-bold text-gray-900">Facillit Account</h4>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-50 text-brand-green uppercase tracking-wide border border-green-100">
                Oficial
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Sua credencial única para acessar Education, Schools e Enterprise. 
            Centralizamos seus dados para garantir portabilidade total.
          </p>
        </div>
      </div>

      {/* Grid de Segurança */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Status */}
        <div className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded-lg border border-gray-50">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-green shadow-sm border border-gray-100">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</span>
            <span className="text-xs font-bold text-gray-900">Ambiente Seguro</span>
          </div>
        </div>

        {/* Badges de Compliance */}
        <div className="flex items-center justify-between sm:justify-end gap-2 h-full">
            <div className="flex flex-col items-center gap-1 group/icon" title="Criptografia Ponta a Ponta">
                <div className="p-1.5 rounded-md text-gray-400 group-hover/icon:text-brand-purple group-hover/icon:bg-purple-50 transition-colors">
                    <Lock className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-bold text-gray-400 uppercase">SSL</span>
            </div>
            <div className="w-[1px] h-6 bg-gray-100"></div>
            <div className="flex flex-col items-center gap-1 group/icon" title="Identidade Global">
                <div className="p-1.5 rounded-md text-gray-400 group-hover/icon:text-brand-purple group-hover/icon:bg-purple-50 transition-colors">
                    <Globe className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Global</span>
            </div>
             <div className="w-[1px] h-6 bg-gray-100"></div>
            <div className="flex flex-col items-center gap-1 group/icon" title="Biometria / ID Único">
                <div className="p-1.5 rounded-md text-gray-400 group-hover/icon:text-brand-purple group-hover/icon:bg-purple-50 transition-colors">
                    <Fingerprint className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-bold text-gray-400 uppercase">Unique</span>
            </div>
        </div>

      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
          <CheckCircle2 className="w-3 h-3 text-brand-green" />
          <p className="text-[10px] text-gray-400 font-medium">
            Seus dados estão protegidos e criptografados (End-to-End).
          </p>
      </div>

    </div>
  );
}