"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// [ATUALIZAÇÃO 1] Importar ícone Eye ou Lock
import { User, Shield, Sparkles, LayoutDashboard, LogOut, ChevronRight, LucideIcon, Menu, X, Eye } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { UserProfile, UserIntelligence, AccountTabOption } from "@/types/account";
import { createClient } from "@/lib/supabase/client";

// Tabs
import OverviewTab from "./_components/overview-tab";
import ProfileTab from "./_components/profile-tab";
import SecurityTab from "./_components/security-tab";
import AiTab from "./_components/ai-tab";
// [ATUALIZAÇÃO 2] Importar a nova aba
import { PrivacyTab } from "./_components/privacy-tab";

interface ClientPageProps {
  initialUser: UserProfile;
  initialIntelligence: UserIntelligence | null;
  initialPrivacy: any; // [ATUALIZAÇÃO 3] Receber privacidade
}

interface MenuItem {
  // Nota: Você precisará atualizar o type AccountTabOption em src/types/account.ts para incluir "privacy"
  id: AccountTabOption | "privacy"; 
  label: string;
  icon: LucideIcon;
}

export default function AccountClientPage({ initialUser, initialIntelligence, initialPrivacy }: ClientPageProps) {
  // Adicionar "privacy" ao estado inicial se quiser, ou manter "overview"
  const [activeTab, setActiveTab] = useState<AccountTabOption | "privacy">("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { id: "profile", label: "Meu Perfil", icon: User },
    // [ATUALIZAÇÃO 4] Item do menu adicionado
    { id: "privacy", label: "Privacidade", icon: Eye },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "ai", label: "Inteligência", icon: Sparkles },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleTabChange = (id: AccountTabOption | "privacy") => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in duration-500">
        
        {/* --- HEADER ACCOUNT (Mantido igual) --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12 border-b border-gray-100 pb-6 relative">
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                    <Image src="/assets/images/accont.svg" width={32} height={32} alt="Facillit Account" className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-brand-gradient">
                        Facillit Account
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
                        Centro de controle da sua identidade digital.
                    </p>
                </div>
            </div>

            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden absolute top-0 right-0 p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
            
            {/* --- NAVEGAÇÃO --- */}
            <nav className={cn(
                "w-full lg:w-64 flex-shrink-0 transition-all duration-300 ease-in-out z-20",
                "lg:block", 
                isMobileMenuOpen ? "block" : "hidden"
            )}>
                <div className="flex flex-col gap-2 p-1 lg:p-0 bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-xl lg:shadow-none border border-gray-100 lg:border-none absolute lg:relative w-full top-0 left-0 lg:sticky lg:top-4">
                    
                    <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest lg:mb-2">Menu</p>
                    
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3.5 text-sm font-bold rounded-xl transition-all text-left",
                                    isActive 
                                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20" 
                                        : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-gray-400")} />
                                {item.label}
                                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                            </button>
                        )
                    })}

                    <div className="w-full h-[1px] bg-gray-100 my-2 lg:my-4"></div>
                    
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3.5 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-all w-full text-left"
                    >
                        <LogOut className="w-4 h-4" />
                        Encerrar Sessão
                    </button>
                </div>
            </nav>

            {/* Overlay Mobile */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 z-10 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* --- ÁREA DE CONTEÚDO --- */}
            <div className={cn("flex-1 min-w-0 bg-white rounded-3xl border border-gray-100 p-6 md:p-10 shadow-sm", isMobileMenuOpen && "hidden lg:block")}>
                {activeTab === "overview" && <OverviewTab user={initialUser} intelligence={initialIntelligence} setTab={setActiveTab as any} />}
                {activeTab === "profile" && <ProfileTab user={initialUser} />}
                
                {/* [ATUALIZAÇÃO 5] Renderizar Aba Privacidade */}
                {activeTab === "privacy" && <PrivacyTab privacySettings={initialPrivacy} />}
                
                {activeTab === "security" && <SecurityTab />}
                {activeTab === "ai" && <AiTab user={initialUser} />}
            </div>

        </div>
    </div>
  );
}