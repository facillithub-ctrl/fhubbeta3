"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, Settings, AlertCircle } from "lucide-react";
import { UserProfile } from "@/types/account";

// Componentes
import { AccountSidebar } from "@/shared/ui//account-sidebar"; // Use o nome correto da sidebar exportada
import { PersonalInfo } from "./_sections/personal-info";
import { SecuritySettings } from "./_sections/security-settings";

// Placeholder para AI e Billing (pode criar arquivos similares depois)
const Placeholder = ({ title }: { title: string }) => (
  <div className="max-w-4xl mx-auto text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
        <Settings className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-gray-500 mt-1">Funcionalidade em desenvolvimento.</p>
  </div>
);

export default function AccountPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab"); // null = Home/Overview
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para recarregar dados após update
  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data, error: dbError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (dbError) throw dbError;

      // Merge Auth Email com Profile Data
      setProfile({ ...data, email: user.email } as UserProfile);
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível carregar seus dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (error || !profile) {
    return (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center text-red-500">
            <AlertCircle className="w-10 h-10 mb-2" />
            <p>{error || "Perfil não encontrado."}</p>
        </div>
    );
  }

  return (
    <div className="w-full pb-20">
      
      {/* Header Mobile (Titulo da Seção) */}
      <div className="md:hidden mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === "personal" && "Informações Pessoais"}
            {activeTab === "security" && "Segurança"}
            {activeTab === "ai" && "Inteligência Artificial"}
            {!activeTab && "Visão Geral"}
        </h1>
      </div>

      {/* Conteúdo Dinâmico */}
      {!activeTab && (
        // Visão Geral (Overview Simples)
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="text-center py-10">
                <div className="w-24 h-24 bg-brand-gradient rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4">
                    {profile.full_name?.[0]}
                </div>
                <h1 className="text-3xl font-normal text-gray-900">Bem-vindo, {profile.full_name.split(' ')[0]}</h1>
                <p className="text-gray-500 mt-2">Gerencie suas informações, privacidade e segurança.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="/account?tab=personal" className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all group">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600">Informações Pessoais</h3>
                    <p className="text-sm text-gray-500 mt-1">Atualize sua foto, nome e bio.</p>
                </a>
                <a href="/account?tab=security" className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all group">
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600">Segurança</h3>
                    <p className="text-sm text-gray-500 mt-1">Proteja sua conta e recupere senha.</p>
                </a>
            </div>
        </div>
      )}

      {activeTab === "personal" && <PersonalInfo profile={profile} refresh={fetchProfile} />}
      {activeTab === "security" && <SecuritySettings profile={profile} />}
      {activeTab === "ai" && <Placeholder title="Configurações de IA" />}
      {activeTab === "billing" && <Placeholder title="Assinaturas e Planos" />}

    </div>
  );
}