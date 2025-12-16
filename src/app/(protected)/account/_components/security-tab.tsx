"use client";

import { useState } from "react";
import { Lock, Key, Smartphone, Loader2 } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

export default function SecurityTab() {
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        <div className="border-b border-gray-100 pb-5">
            <h2 className="text-xl font-bold text-gray-900">Segurança & Login</h2>
            <p className="text-xs text-gray-500 mt-1">Proteja sua conta e verifique atividades.</p>
        </div>

        {/* Alterar Senha */}
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-brand-purple"/> Alterar Senha
            </h3>
            
            <div className="space-y-3">
                <input 
                    type="password" 
                    placeholder="Senha Atual"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-brand-purple transition-all"
                />
                <input 
                    type="password" 
                    placeholder="Nova Senha"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-brand-purple transition-all"
                />
            </div>
            
            <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-all flex items-center gap-2"
            >
                {loading && <Loader2 className="w-3 h-3 animate-spin" />}
                Atualizar Senha
            </button>
        </form>

        <div className="w-full h-[1px] bg-gray-100 my-8"></div>

        {/* MFA / Dispositivos */}
        <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-brand-purple"/> Dispositivos Conectados
            </h3>
            
            <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">💻</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-900">Chrome no Windows</p>
                        <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Ativo agora
                        </p>
                    </div>
                </div>
                <span className="text-[10px] text-gray-400">São Paulo, BR</span>
            </div>
        </div>

        <div className="pt-4">
            <SecureEnvironmentCard />
        </div>
    </div>
  );
}