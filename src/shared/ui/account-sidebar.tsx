"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  User, ShieldCheck, CreditCard, Sparkles, LayoutGrid, 
  LogOut, Home, Bell 
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Início", icon: Home, tab: null }, // Tab null = Overview
  { label: "Informações Pessoais", icon: User, tab: "personal" },
  { label: "Dados e Privacidade", icon: ShieldCheck, tab: "security" },
  { label: "Inteligência Artificial", icon: Sparkles, tab: "ai" },
  { label: "Assinaturas", icon: CreditCard, tab: "billing" },
];

export function AccountSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-20 pb-4 z-40">
      <div className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.tab || (item.tab === null && !currentTab);
          return (
            <Link
              key={item.label}
              href={item.tab ? `/account?tab=${item.tab}` : "/account"}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-r-full text-sm font-medium transition-colors mr-2",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "fill-blue-100" : "")} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="px-3 mt-auto border-t border-gray-100 pt-4 space-y-1">
        <Link href="/select-hub" className="flex items-center gap-4 px-4 py-3 rounded-r-full text-sm font-medium text-gray-600 hover:bg-gray-50">
            <LayoutGrid className="w-5 h-5" />
            Voltar aos Apps
        </Link>
        <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-r-full text-sm font-medium text-red-600 hover:bg-red-50 text-left"
        >
            <LogOut className="w-5 h-5" />
            Sair
        </button>
      </div>
    </aside>
  );
}