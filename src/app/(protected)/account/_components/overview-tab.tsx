"use client";

import { UserProfile, UserIntelligence, AccountTabOption } from "@/types/account";
import { ArrowRight, User, ShieldCheck, Zap, Activity } from "lucide-react";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

interface Props {
    user: UserProfile;
    intelligence: UserIntelligence | null;
    // CORREÇÃO: Tipagem estrita
    setTab: (tab: AccountTabOption) => void;
}

export default function OverviewTab({ user, intelligence, setTab }: Props) {
  
  const calculateCompletion = () => {
    let score = 0;
    if (user.full_name) score += 20;
    if (user.avatar_url) score += 20;
    if (user.bio) score += 20;
    if (user.address?.cep) score += 20;
    if (user.onboarding_completed) score += 20;
    return score;
  };

  const completion = calculateCompletion();

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                {user.avatar_url ? (
                    <img src={user.avatar_url} alt="User" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-xl font-bold text-gray-400">{user.full_name?.charAt(0) ?? "U"}</span>
                )}
            </div>
            <div>
                <h2 className="text-xl font-extrabold text-gray-900">{user.full_name ?? "Usuário"}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">@{user.handle ?? "sem_handle"}</span>
                    <span className="text-xs text-gray-400">ID: {user.facillit_id || '---'}</span>
                </div>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-green-600 font-bold text-xs uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4" /> Status
                </div>
                <span className="text-xl font-bold text-gray-900 capitalize">{user.account_type}</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-brand-purple font-bold text-xs uppercase tracking-wide">
                    <Zap className="w-4 h-4" /> Plano
                </div>
                <span className="text-xl font-bold text-gray-900">Premium</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wide">
                    <Activity className="w-4 h-4" /> Perfil
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${completion}%` }}></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{completion}%</span>
                </div>
            </div>
        </div>

        {/* Intelligence (Opcional) */}
        {intelligence && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <h3 className="font-bold text-sm mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400"/> Insights</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase">Hábitos Fortes</p>
                        <p className="text-sm font-bold">{intelligence.productive_profile?.top_habits?.length || 0}</p>
                    </div>
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase">Foco Médio</p>
                        <p className="text-sm font-bold">{intelligence.productive_profile?.avg_focus_time || 0} min</p>
                    </div>
                </div>
            </div>
        )}

        {/* Action Button */}
        <button 
            onClick={() => setTab("profile")}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-brand-purple/30 hover:bg-gray-50 transition-all group"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:text-brand-purple transition-colors">
                    <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                    <h4 className="text-sm font-bold text-gray-900">Editar Perfil</h4>
                    <p className="text-[11px] text-gray-500">Atualize sua foto, bio e dados pessoais.</p>
                </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-purple transition-colors" />
        </button>

        <div className="pt-4">
            <SecureEnvironmentCard />
        </div>
    </div>
  );
}