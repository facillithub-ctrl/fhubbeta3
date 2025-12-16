"use client";

import { useState } from "react";
import { User, Shield, Sparkles, LayoutDashboard, LogOut, ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { UserProfile, UserIntelligence, AccountTabOption } from "@/types/account";
// CORREÇÃO AQUI: Importar createClient do arquivo client.ts específico
import { createClient } from "@/lib/supabase/client"; 
import { useRouter } from "next/navigation";

// Tabs
import OverviewTab from "./_components/overview-tab";
import ProfileTab from "./_components/profile-tab";
import SecurityTab from "./_components/security-tab";
import AiTab from "./_components/ai-tab";

interface ClientPageProps {
  initialUser: UserProfile;
  initialIntelligence: UserIntelligence | null;
}

interface MenuItem {
  id: AccountTabOption;
  label: string;
  icon: LucideIcon;
}

export default function AccountClientPage({ initialUser, initialIntelligence }: ClientPageProps) {
  const [activeTab, setActiveTab] = useState<AccountTabOption>("overview");
  const router = useRouter();
  
  // CORREÇÃO AQUI: Instanciar o cliente do navegador
  const supabase = createClient(); 

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { id: "profile", label: "Meu Perfil", icon: User },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "ai", label: "Inteligência", icon: Sparkles },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 animate-in fade-in duration-500">
        
        <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Minha Conta</h1>
            <p className="text-sm text-gray-500 mt-1">Gerencie suas preferências e identidade no ecossistema.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
            
            {/* --- MENU DE NAVEGAÇÃO --- */}
            <nav className="w-full lg:w-64 flex-shrink-0">
                <div className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide pb-2 lg:pb-0 sticky top-4">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap",
                                    isActive 
                                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20" 
                                        : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-400")} />
                                {item.label}
                                {isActive && <ChevronRight className="w-3 h-3 ml-auto hidden lg:block" />}
                            </button>
                        )
                    })}

                    <div className="hidden lg:block w-full h-[1px] bg-gray-100 my-2"></div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-all w-full text-left mt-0 lg:mt-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </div>
            </nav>

            {/* --- CONTEÚDO --- */}
            <div className="flex-1 min-w-0 bg-white rounded-3xl lg:border lg:border-gray-100 lg:p-8 lg:shadow-sm">
                {activeTab === "overview" && <OverviewTab user={initialUser} intelligence={initialIntelligence} setTab={setActiveTab} />}
                {activeTab === "profile" && <ProfileTab user={initialUser} />}
                {activeTab === "security" && <SecurityTab />}
                {activeTab === "ai" && <AiTab user={initialUser}/>}
            </div>

        </div>
    </div>
  );
}