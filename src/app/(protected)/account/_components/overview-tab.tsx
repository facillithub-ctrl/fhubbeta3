import Image from "next/image";
import { Shield, Activity, CreditCard, Smartphone } from "lucide-react";

export function OverviewTab({ profile }: { profile: any }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Header Card */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gradient opacity-5 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-100 overflow-hidden relative">
                  {profile?.avatar_url ? (
                      <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
                  ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-purple text-white text-3xl font-bold">
                          {profile?.full_name?.[0] || "U"}
                      </div>
                  )}
              </div>
              <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name || "Usuário Facillit"}</h2>
                  <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                      <span className="text-brand-purple font-mono">@{profile?.handle || "usuario"}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="capitalize">{profile?.account_type || "Individual"}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
                      <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Ativo
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-bold border border-gray-100">
                          ID: {profile?.facillit_id || "..."}
                      </span>
                  </div>
              </div>
          </div>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-brand-purple">
                  <Shield className="w-5 h-5" />
                  <h3 className="font-bold text-sm uppercase tracking-wide">Segurança</h3>
              </div>
              <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{profile?.device_settings?.trusted ? "Alta" : "Média"}</p>
                  <p className="text-xs text-gray-500">Nível de proteção da conta</p>
              </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-brand-green">
                  <Activity className="w-5 h-5" />
                  <h3 className="font-bold text-sm uppercase tracking-wide">Atividade</h3>
              </div>
              <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{profile?.active_modules?.length || 0} Apps</p>
                  <p className="text-xs text-gray-500">Módulos instalados</p>
              </div>
          </div>

          <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-blue-500">
                  <Smartphone className="w-5 h-5" />
                  <h3 className="font-bold text-sm uppercase tracking-wide">Acessos</h3>
              </div>
              <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">Este disp.</p>
                  <p className="text-xs text-gray-500">Sessão atual ativa</p>
              </div>
          </div>
      </div>
    </div>
  );
}