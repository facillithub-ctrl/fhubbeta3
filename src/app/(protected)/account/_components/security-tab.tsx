"use client";

import { useState, useTransition } from "react";
import { ShieldCheck, Smartphone, Key, Lock, Save, Loader2 } from "lucide-react";
import { updateSecuritySettings } from "../actions";

export function SecurityTab({ profile }: { profile: any }) {
  const [isPending, startTransition] = useTransition();
  // Inicializa com valores do banco ou padrão
  const [settings, setSettings] = useState(profile.device_settings || { trusted: false, notifications: true, twoFactor: false });

  const handleToggle = (key: string) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    
    // Auto-save para UX fluida
    startTransition(async () => {
        await updateSecuritySettings(profile.id, newSettings);
    });
  };

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4">
        
        {/* Status de Segurança */}
        <div className="bg-gradient-to-r from-brand-purple to-brand-dark rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-1">Status de Segurança</h2>
                    <p className="text-white/80 text-sm">Sua conta está protegida.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-green-400" />
                </div>
            </div>
        </div>

        {/* Controles */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Smartphone className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Dispositivo Confiável</h4>
                        <p className="text-xs text-gray-500">Manter sessão ativa neste navegador.</p>
                    </div>
                </div>
                <button 
                    onClick={() => handleToggle('trusted')}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.trusted ? 'bg-brand-green' : 'bg-gray-300'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.trusted ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>

            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-50 rounded-lg text-brand-purple"><Key className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Autenticação em 2 Fatores (2FA)</h4>
                        <p className="text-xs text-gray-500">Camada extra de proteção.</p>
                    </div>
                </div>
                <button 
                    onClick={() => handleToggle('twoFactor')}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.twoFactor ? 'bg-brand-purple' : 'bg-gray-300'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings.twoFactor ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>

            <div className="p-6 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-50 rounded-lg text-red-500"><Lock className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-bold text-gray-900">Alterar Senha</h4>
                        <p className="text-xs text-gray-500">Última alteração: há 3 meses</p>
                    </div>
                </div>
                <button className="text-xs font-bold border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 group-hover:border-gray-300 transition-all">
                    Alterar
                </button>
            </div>
        </div>
        
        {isPending && <p className="text-xs text-brand-purple flex items-center gap-1 justify-end"><Loader2 className="w-3 h-3 animate-spin"/> Salvando...</p>}
    </div>
  );
}