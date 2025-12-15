"use client";

import { useState } from "react";
import { Shield, Key, Mail, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { UserProfile } from "@/types/account";

export function SecuritySettings({ profile }: { profile: UserProfile }) {
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const sendPasswordReset = async () => {
    setLoading(true);
    try {
      // Envia email de reset para o email do usuário
      const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
        redirectTo: `${window.location.origin}/account/update-password`, // Você precisaria criar essa página
      });
      if (error) throw error;
      setResetSent(true);
    } catch (error: any) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl font-normal text-gray-900">Dados e Privacidade</h2>
        <p className="text-gray-500">Opções essenciais de segurança para sua conta Facillit.</p>
      </div>

      {/* Card de Email/Senha */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
            
            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail className="w-5 h-5"/></div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">E-mail de Acesso</h4>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                    </div>
                </div>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">Verificado</span>
            </div>

            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-50 text-brand-purple rounded-lg"><Key className="w-5 h-5"/></div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900">Senha</h4>
                        <p className="text-xs text-gray-500">Última alteração não registrada</p>
                    </div>
                </div>
                {resetSent ? (
                    <span className="text-green-600 text-sm font-bold">E-mail enviado!</span>
                ) : (
                    <button 
                        onClick={sendPasswordReset} 
                        disabled={loading}
                        className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin"/>}
                        Alterar Senha
                    </button>
                )}
            </div>

        </div>
      </div>

      {/* Card de Dispositivos */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-base font-medium text-gray-900">Seus Dispositivos</h3>
         </div>
         <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">Sessão Atual</p>
                        <p className="text-xs text-gray-500">Navegador Web • São Paulo, BR</p>
                    </div>
                </div>
                <div className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    Online Agora
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}