"use client";

import { useState } from "react";
import {
  UserProfile,
  UserIntelligence,
  ProfilePrivacySettings,
  AccountTabOption,
} from "@/types/account";

import {
  User,
  Shield,
  Sparkles,
  LayoutDashboard,
  Settings2,
  Share2,
} from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/button";
import { Sidebar } from "@/shared/ui/sidebar";

// Tabs
import OverviewTab from "./_components/overview-tab";
import ProfileTab from "./_components/profile-tab";
import PrivacyTab from "./_components/privacy-tab";
import AiTab from "./_components/ai-tab";
import SecurityTab from "./_components/security-tab";

interface AccountClientPageProps {
  initialUser: UserProfile;
  initialIntelligence: UserIntelligence | null;
  initialPrivacy: ProfilePrivacySettings;
}

export default function AccountClientPage({
  initialUser,
  initialIntelligence,
  initialPrivacy,
}: AccountClientPageProps) {
  const [activeTab, setActiveTab] = useState<AccountTabOption>("overview");

  const tabs: {
    id: AccountTabOption;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { id: "profile", label: "Meu Perfil", icon: User },
    { id: "privacy", label: "Privacidade", icon: Shield },
    { id: "ai", label: "Inteligência Art.", icon: Sparkles },
    { id: "security", label: "Segurança", icon: Settings2 },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden transition-colors duration-300">
      {/* Sidebar principal */}
      <Sidebar />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <div className="w-2 h-8 bg-primary rounded-full" />
            Minha Conta
          </h1>

          {initialUser.handle && (
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex"
              onClick={() =>
                window.open(`/u/${initialUser.handle}`, "_blank")
              }
            >
              <Share2 className="w-4 h-4 mr-2" />
              Ver Perfil Público
            </Button>
          )}
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar interno (tabs desktop) */}
          <aside className="w-64 border-r border-border bg-card/50 hidden lg:flex flex-col p-4 gap-1 overflow-y-auto">
            <p className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 mt-4">
              Configurações
            </p>

            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4",
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  {tab.label}
                </button>
              );
            })}
          </aside>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto bg-muted/5 p-6 md:p-10">
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Tabs mobile */}
              <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
                {tabs.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-muted-foreground"
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Renderização das abas */}
              {activeTab === "overview" && (
                <OverviewTab user={initialUser} />
              )}

              {activeTab === "profile" && (
                <ProfileTab user={initialUser} />
              )}

              {activeTab === "privacy" && (
                <PrivacyTab settings={initialPrivacy} />
              )}

              {activeTab === "ai" && (
                <AiTab
                  preferences={initialUser.ai_preferences}
                  intelligence={initialIntelligence}
                />
              )}

              {activeTab === "security" && (
                <SecurityTab email={initialUser.email} />
              )}
            </div>

            {/* Footer */}
            <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
              <p>
                Facillit ID:{" "}
                <span className="font-mono bg-muted px-1 rounded">
                  {initialUser.id.slice(0, 8)}...
                </span>
              </p>
              <p>Última sincronização: agora</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
