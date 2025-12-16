"use client";

import { useState } from "react";
import { User, Shield, Sparkles, LayoutDashboard, LogOut, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// Tabs
import OverviewTab from "./_components/overview-tab";
import ProfileTab from "./_components/profile-tab";
import SecurityTab from "./_components/security-tab";
import AiTab from "./_components/ai-tab";

type TabOption = "overview" | "profile" | "security" | "ai";

const tabs: { id: TabOption; label: string; icon: any }[] = [
  { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
  { id: "profile", label: "Meu Perfil", icon: User },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "ai", label: "Inteligência", icon: Sparkles },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabOption>("overview");
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row animate-in fade-in duration-500">
      
      {/* --- SIDEBAR DE NAVEGAÇÃO (Desktop: Esquerda / Mobile: Topo) --- */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 bg-white flex-shrink-0 sticky top-0 md:h-screen z-20">
        <div className="p-6 md:p-8">
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight mb-1">Minha Conta</h1>
            <p className="text-xs text-gray-500">Gerencie suas preferências</p>
        </div>

        {/* Menu Items */}
        <nav className="flex md:flex-col gap-1 px-4 md:px-6 overflow-x-auto scrollbar-hide pb-4 md:pb-0">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap md:whitespace-normal",
                            isActive 
                                ? "bg-brand-purple/5 text-brand-purple" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                        )}
                    >
                        <tab.icon className={cn("w-4 h-4", isActive ? "text-brand-purple" : "text-gray-400")} />
                        {tab.label}
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto hidden md:block" />}
                    </button>
                )
            })}

            <div className="md:mt-8 md:pt-8 md:border-t md:border-gray-50 px-4 md:px-0">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-all w-full text-left"
                >
                    <LogOut className="w-4 h-4" />
                    Sair da Conta
                </button>
            </div>
        </nav>
      </aside>

      {/* --- ÁREA DE CONTEÚDO (Dinâmica) --- */}
      <main className="flex-1 min-w-0 bg-white overflow-y-auto h-[calc(100vh-80px)] md:h-screen">
         <div className="max-w-3xl mx-auto p-6 md:p-12 pb-24">
            {activeTab === "overview" && <OverviewTab onChangeTab={setActiveTab} />}
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "ai" && <AiTab />}
         </div>
      </main>

    </div>
  );
}