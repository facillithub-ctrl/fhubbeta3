"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, User, ShieldCheck, CreditCard, 
  Sparkles, LogOut, Grid, Bell
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { supabase } from "@/lib/supabase";

const menuItems = [
  { label: "Visão Geral", icon: LayoutDashboard, href: "/account" },
  { label: "Meu Perfil", icon: User, href: "/account?tab=profile" },
  { label: "Segurança", icon: ShieldCheck, href: "/account?tab=security" },
  { label: "Assinatura", icon: CreditCard, href: "/account?tab=billing" },
  { label: "Preferências IA", icon: Sparkles, href: "/account?tab=ai" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-[260px] bg-white border-r border-gray-100 hidden md:flex flex-col z-40 shadow-sm">
      
      {/* Header Sidebar */}
      <div className="p-6 border-b border-gray-50 h-20 flex items-center gap-3">
        <div className="relative w-8 h-8 opacity-80 hover:opacity-100 transition-opacity">
            <Image 
                src="/assets/images/accont.svg" 
                alt="Account" 
                fill 
                className="object-contain"
            />
        </div>
        <div>
            <h1 className="font-bold text-sm text-gray-900 leading-none">Facillit Account</h1>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Gestão de Conta</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Principal</p>
        {menuItems.map((item) => {
            const isActive = pathname === item.href; // Lógica simples
            return (
                <Link 
                    key={item.href} 
                    href={item.href}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                        isActive 
                            ? "bg-brand-purple/5 text-brand-purple" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                >
                    <item.icon className={cn("w-4 h-4 transition-opacity", isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100")} />
                    {item.label}
                </Link>
            )
        })}

        <div className="pt-6 mt-6 border-t border-gray-50">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Sistema</p>
            <Link href="/select-hub" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-green transition-all">
                <Grid className="w-4 h-4 opacity-60" />
                Voltar aos Apps
            </Link>
        </div>
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-gray-50">
        <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
            <LogOut className="w-4 h-4 opacity-70" />
            Sair da Conta
        </button>
      </div>
    </aside>
  );
}