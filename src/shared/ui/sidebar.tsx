"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, User, Settings, LogOut, 
  GraduationCap, Building2, Rocket, Briefcase, Lock 
} from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { createClient } from "@/lib/supabase/client";

// Interface para definir status do item
interface MenuItem {
    label: string;
    icon: any;
    href: string;
    status?: 'active' | 'beta' | 'soon'; // Novo campo
}

const menuItems: MenuItem[] = [
  { label: "Visão Geral", icon: LayoutDashboard, href: "/select-hub", status: 'active' }, 
  { label: "Education", icon: GraduationCap, href: "/dashboard/education", status: 'active' },
  { label: "Schools", icon: Building2, href: "/dashboard/schools", status: 'active' },
  { label: "Startups", icon: Rocket, href: "/dashboard/startups", status: 'beta' },
  { label: "Enterprise", icon: Briefcase, href: "/dashboard/enterprise", status: 'soon' }, // Exemplo "Em breve"
];

const secondaryItems: MenuItem[] = [
  { label: "Configurações", icon: Settings, href: "/account", status: 'active' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = pathname === item.href;
    const isLocked = item.status === 'soon';
    
    const Wrapper = isLocked ? 'div' : Link;

    return (
        <Wrapper
            key={item.href}
            href={isLocked ? '#' : item.href}
            className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group select-none",
                isActive
                    ? "bg-primary/10 text-primary"
                    : isLocked 
                        ? "text-muted-foreground/50 cursor-not-allowed"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            )}
        >
            <div className="flex items-center gap-3">
                <item.icon
                    className={cn(
                        "w-4 h-4",
                        isActive ? "text-primary" : isLocked ? "text-muted-foreground/40" : "text-muted-foreground"
                    )}
                />
                {item.label}
            </div>
            
            {/* Badges de Status */}
            {item.status === 'beta' && (
                <span className="text-[9px] font-bold bg-purple-500/10 text-purple-600 px-1.5 py-0.5 rounded border border-purple-500/20">BETA</span>
            )}
            {item.status === 'soon' && (
                <Lock className="w-3 h-3 text-muted-foreground/40" />
            )}
        </Wrapper>
    );
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex-col hidden md:flex h-full transition-colors duration-300">
      {/* Logo Area */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-sm">F</div>
        <span className="font-extrabold text-lg tracking-tight text-foreground">Facillit Hub</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        <div>
          <p className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Menu</p>
          <nav className="space-y-1">
            {menuItems.map(renderMenuItem)}
          </nav>
        </div>

        <div>
          <p className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Sistema</p>
          <nav className="space-y-1">
            {secondaryItems.map(renderMenuItem)}
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all text-left">
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </nav>
        </div>
      </div>
      
      {/* Mini Profile (Linkado ao Account) */}
      <div className="p-4 border-t border-border">
         <Link href="/account" className="flex items-center gap-3 p-2 rounded-xl bg-muted/30 border border-border hover:bg-muted hover:border-primary/30 transition-all cursor-pointer group">
             <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border text-muted-foreground group-hover:text-primary transition-colors">
                <User className="w-4 h-4" />
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">Minha Conta</p>
                <p className="text-[10px] text-muted-foreground truncate">Gerenciar ID</p>
             </div>
         </Link>
      </div>
    </aside>
  );
}