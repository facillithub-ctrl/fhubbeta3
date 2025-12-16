"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  LogOut, 
  GraduationCap, 
  Building2, 
  Rocket 
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
// CORREÇÃO: Importar da nova estrutura
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  { label: "Visão Geral", icon: LayoutDashboard, href: "/account" },
  { label: "Education", icon: GraduationCap, href: "/education" },
  { label: "Enterprise", icon: Building2, href: "/enterprise" },
  { label: "Startups", icon: Rocket, href: "/startups" },
];

const secondaryItems = [
  { label: "Configurações", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  // CORREÇÃO: Instanciar o cliente
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex-col hidden md:flex h-full">
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-50 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
          F
        </div>
        <span className="font-extrabold text-lg tracking-tight text-gray-900">
          Facillit Hub
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        
        {/* Main Menu */}
        <div>
          <p className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-brand-purple/5 text-brand-purple"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-4 h-4",
                      isActive ? "text-brand-purple" : "text-gray-400"
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Secondary Menu */}
        <div>
          <p className="px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Sistema
          </p>
          <nav className="space-y-1">
            {secondaryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-brand-purple/5 text-brand-purple"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className="w-4 h-4 text-gray-400" />
                {item.label}
              </Link>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all text-left"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        </div>
      </div>

      {/* User Footer (Mini Profile) */}
      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-400">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-gray-900 truncate">Minha Conta</p>
            <p className="text-[10px] text-gray-500 truncate">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}