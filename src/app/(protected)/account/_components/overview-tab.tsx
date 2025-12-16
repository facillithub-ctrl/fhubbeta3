"use client";

import { UserProfile, UserIntelligence, AccountTabOption } from "@/types/account";
import { User, Lock, CreditCard, ChevronRight, LayoutGrid } from "lucide-react";
import { VerificationBadge } from "@/shared/ui/verification-badge";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

interface Props {
    user: UserProfile;
    intelligence: UserIntelligence | null;
    setTab: (tab: AccountTabOption) => void;
}

export default function OverviewTab({ user, intelligence, setTab }: Props) {
  
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
        
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100">
            <div className="mb-6 relative">
                {/* Foto de Perfil Limpa */}
                <div className="w-28 h-28 rounded-full p-1 bg-white border border-gray-200 shadow-sm overflow-hidden mx-auto">
                    {user.avatar_url ? (
                        <img src={user.avatar_url} alt="User" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400">
                            {user.full_name?.charAt(0) ?? "U"}
                        </div>
                    )}
                </div>
                {/* Removido o ícone do Account daqui conforme pedido */}
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Bem-vindo, {user.full_name?.split(' ')[0]}
            </h1>
            
            <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-sm font-medium text-gray-500">@{user.handle}</span>
                <VerificationBadge tier={user.verification_tier || 'none'} />
            </div>
        </div>

        {/* --- GRID DE CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Privacidade */}
            <div 
                onClick={() => setTab("security")}
                className="group p-6 rounded-3xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <Lock className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacidade & Segurança</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Gerencie sua senha, verificação em duas etapas e dispositivos conectados.
                </p>
                <div className="mt-4 text-xs font-bold text-blue-600 group-hover:underline">Revisar configurações</div>
            </div>

            {/* Card 2: Perfil */}
            <div 
                onClick={() => setTab("profile")}
                className="group p-6 rounded-3xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                        <User className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Informações Pessoais</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Atualize sua foto, bio, pronomes e como você aparece no Facillit Hub.
                </p>
                <div className="mt-4 text-xs font-bold text-purple-600 group-hover:underline">Gerenciar perfil</div>
            </div>

            {/* Card 3: Dados & IA */}
            <div 
                onClick={() => setTab("ai")}
                className="group p-6 rounded-3xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dados & Inteligência</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Controle como a I.A. personaliza sua experiência e seus dados de aprendizado.
                </p>
                <div className="mt-4 text-xs font-bold text-yellow-600 group-hover:underline">Calibrar I.A.</div>
            </div>

            {/* Card 4: Assinatura */}
            <div className="group p-6 rounded-3xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                        <CreditCard className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-green-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Assinaturas</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Visualize seu plano atual, histórico de pagamentos e métodos de cobrança.
                </p>
                <div className="mt-4 text-xs font-bold text-green-600 group-hover:underline">Gerenciar plano</div>
            </div>

        </div>

        <div className="pt-8 opacity-80 flex justify-center">
            <div className="max-w-md w-full">
                <SecureEnvironmentCard />
            </div>
        </div>
    </div>
  );
}