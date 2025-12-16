"use client";

import { UserProfile, UserIntelligence, AccountTabOption } from "@/types/account";
import { ArrowRight, User, ShieldCheck, Zap, Activity, AlertCircle } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

interface Props {
    user: UserProfile;
    intelligence: UserIntelligence | null;
    setTab: (tab: AccountTabOption) => void;
}

export default function OverviewTab({ user, intelligence, setTab }: Props) {
  
  const calculateCompletion = () => {
    let score = 0;
    if (user.full_name) score += 25;
    if (user.avatar_url) score += 25;
    if (user.bio) score += 25;
    if (user.onboarding_completed) score += 25;
    return score;
  };

  const completion = calculateCompletion();

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        {/* Header Profile */}
        <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                {user.avatar_url ? (
                    <img src={user.avatar_url} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-3xl font-bold text-gray-300">{user.full_name?.charAt(0) ?? "U"}</span>
                )}
            </div>
            <div>
                <h2 className="text-2xl font-extrabold text-gray-900">{user.full_name ?? "Usuário"}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono font-bold">@{user.handle ?? "sem_handle"}</span>
                    <span className="text-xs text-gray-400 border border-gray-100 px-2 py-0.5 rounded">ID: {user.facillit_id || 'N/A'}</span>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4" /> Conta
                </div>
                <span className="text-lg font-bold text-gray-900 capitalize">{user.account_type}</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-brand-purple font-bold text-xs uppercase tracking-wide">
                    <Zap className="w-4 h-4" /> Plano
                </div>
                <span className="text-lg font-bold text-gray-900">Basic</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wide">
                    <Activity className="w-4 h-4" /> Perfil
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${completion}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{completion}%</span>
                </div>
            </div>
        </div>

        {/* Action Button */}
        <button 
            onClick={() => setTab("profile")}
            className="w-full flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-brand-purple/40 hover:bg-gray-50/80 transition-all group shadow-sm hover:shadow-md"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-brand-purple group-hover:border-brand-purple transition-all">
                    <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-purple transition-colors">Editar Informações</h4>
                    <p className="text-xs text-gray-500">Atualize sua foto, bio e dados pessoais.</p>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-purple transition-colors" />
        </button>

        <div className="pt-4 opacity-80">
            <SecureEnvironmentCard />
        </div>
    </div>
  );
}