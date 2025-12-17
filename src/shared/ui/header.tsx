"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';
import { 
  ChevronDown, Menu, X, ArrowRight, ExternalLink,
  PenTool, PlayCircle, Gamepad2, School, LayoutDashboard, Code2, 
  Shield, Users, Calendar, Briefcase,
  Scale, Accessibility, Share2, Newspaper, Sparkles, Layers, Trophy,
  Globe, MonitorPlay, LifeBuoy, Headset, Handshake,
  LogIn, UserPlus, ShieldCheck, UserCog, LayoutTemplate
} from 'lucide-react';

// Dados do Menu (Rich Data) - Mantidos iguais
type MenuItem = { title: string; href: string; desc: string; icon: any; color: string; bg: string; };
type MenuGroup = { title: string; items: MenuItem[]; };
type MenuSection = { label: string; groups: MenuGroup[]; cta?: { text: string; href: string; } };

const menuData: Record<string, MenuSection> = {
  ecossistema: {
    label: "Ecossistema",
    groups: [
      {
        title: "Education (B2C)",
        items: [
          { title: "Facillit Write", href: "/education/write", desc: "Redação e correção IA", icon: PenTool, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Facillit Games", href: "/education/games", desc: "Aprendizagem lúdica", icon: Gamepad2, color: "text-orange-600", bg: "bg-orange-50" },
          { title: "Facillit Play", href: "/education/play", desc: "Streaming Educacional", icon: PlayCircle, color: "text-pink-600", bg: "bg-pink-50" },
        ]
      },
      {
        title: "Enterprise & Schools",
        items: [
          { title: "Facillit Edu", href: "/schools/edu", desc: "Gestão Pedagógica", icon: School, color: "text-indigo-600", bg: "bg-indigo-50" },
          { title: "Facillit Access", href: "/enterprise/access", desc: "IAM & Segurança", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50" },
          { title: "Facillit People", href: "/enterprise/people", desc: "RH Tech", icon: Users, color: "text-sky-600", bg: "bg-sky-50" },
        ]
      },
      {
        title: "Innovation & Global",
        items: [
          { title: "Facillit Center", href: "/startups/center", desc: "Sistema Operacional", icon: LayoutDashboard, color: "text-cyan-600", bg: "bg-cyan-50" },
          { title: "Facillit Day", href: "/individuals/day", desc: "Agenda Inteligente", icon: Calendar, color: "text-yellow-600", bg: "bg-yellow-50" },
          { title: "Facillit API", href: "/startups/api", desc: "Developer Tools", icon: Code2, color: "text-slate-600", bg: "bg-slate-50" },
        ]
      }
    ],
    cta: { text: "Ver todas as 5 vertentes", href: "/ecossistema" }
  },
  explorar: {
    label: "Explorar",
    groups: [
      {
        title: "Showcase",
        items: [
          { title: "Resultados", href: "/explorar/resultados", desc: "Cases de sucesso reais", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
          { title: "Interfaces", href: "/explorar/telas", desc: "Galeria de UI/UX", icon: Layers, color: "text-violet-600", bg: "bg-violet-50" },
          { title: "Novidades", href: "/recursos/atualizacoes", desc: "Atualizações do sistema", icon: Share2, color: "text-blue-600", bg: "bg-blue-50" },
        ]
      },
      {
        title: "Comunidade",
        items: [
          { title: "Blog Oficial", href: "/comunidade/blog", desc: "Artigos e notícias", icon: Newspaper, color: "text-rose-600", bg: "bg-rose-50" },
          { title: "Play Off", href: "/comunidade/playoff", desc: "Desafios e eventos", icon: MonitorPlay, color: "text-red-600", bg: "bg-red-50" },
          { title: "Redes Sociais", href: "/comunidade/social", desc: "Siga a Facillit", icon: Globe, color: "text-pink-600", bg: "bg-pink-50" },
        ]
      }
    ]
  },
  recursos: {
    label: "Recursos",
    groups: [
      {
        title: "Institucional",
        items: [
          { title: "Sobre Nós", href: "/sobre", desc: "Nossa missão e valores", icon: Sparkles, color: "text-yellow-600", bg: "bg-yellow-50" },
          { title: "Carreiras", href: "/recursos/carreiras", desc: "Trabalhe conosco", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
        ]
      },
      {
        title: "Legal & Inclusão",
        items: [
          { title: "Avisos Legais", href: "/recursos/legal", desc: "Termos e privacidade", icon: Scale, color: "text-slate-600", bg: "bg-slate-50" },
          { title: "Acessibilidade", href: "/recursos/acessibilidade", desc: "Recursos inclusivos", icon: Accessibility, color: "text-teal-600", bg: "bg-teal-50" },
        ]
      }
    ]
  },
  suporte: {
    label: "Suporte",
    groups: [
      {
        title: "Ajuda & Contato",
        items: [
          { title: "Central de Ajuda", href: "/help", desc: "Tutoriais e FAQ", icon: LifeBuoy, color: "text-indigo-600", bg: "bg-indigo-50" },
          { title: "Suporte Técnico", href: "/help/support", desc: "Abra um chamado", icon: Headset, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Falar com Vendas", href: "/help/sales", desc: "Planos Enterprise", icon: Handshake, color: "text-green-600", bg: "bg-green-50" },
        ]
      }
    ]
  },
  conta: {
    label: "Conta",
    groups: [
      {
        title: "Acesso",
        items: [
          { title: "Fazer Login", href: "/login", desc: "Acesse sua conta", icon: LogIn, color: "text-brand-purple", bg: "bg-purple-50" },
          { title: "Criar Conta", href: "/register", desc: "Comece gratuitamente", icon: UserPlus, color: "text-brand-green", bg: "bg-green-50" },
        ]
      },
      {
        title: "Facillit ID",
        items: [
          { title: "Minha Conta", href: "/account", desc: "Gerencie seu perfil", icon: UserCog, color: "text-slate-600", bg: "bg-slate-50" },
          { title: "Dashboard", href: "/dashboard", desc: "Visão geral", icon: LayoutTemplate, color: "text-gray-600", bg: "bg-gray-50" },
        ]
      }
    ]
  }
};

const RichCard = ({ item }: { item: MenuItem }) => (
  <Link 
    href={item.href} 
    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-muted transition-all group/item border border-transparent hover:border-border hover:shadow-sm"
  >
    <div className={cn("p-2.5 rounded-xl shrink-0 transition-colors duration-300", item.bg)}>
      <item.icon className={cn("w-5 h-5", item.color)} />
    </div>
    <div>
      <span className="block text-sm font-bold text-foreground group-hover/item:text-primary transition-colors line-clamp-1">
        {item.title}
      </span>
      <span className="text-[11px] text-muted-foreground font-medium leading-tight line-clamp-2 mt-0.5">
        {item.desc}
      </span>
    </div>
  </Link>
);

const NavTrigger = ({ label, isActive, onEnter, onLeave }: any) => (
  <div className="relative h-full flex items-center" onMouseEnter={onEnter} onMouseLeave={onLeave}>
    <button 
      className={cn(
        "px-4 py-2 text-sm font-bold flex items-center gap-1.5 rounded-full transition-all",
        isActive ? "text-primary bg-background shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-primary hover:bg-muted/50"
      )}
    >
      {label} 
      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", isActive ? "rotate-180" : "")} />
    </button>
  </div>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleScroll = useCallback(() => {
    const shouldBeScrolled = window.scrollY > 20;
    setIsScrolled(prev => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));
  }, []);

  useEffect(() => {
    if (isHome) {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    } else {
        setIsScrolled(prev => (prev ? prev : true));
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
    setActiveMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleMenuEnter = (menu: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); 
  };

  const renderMegaMenu = (key: string) => {
    const data = menuData[key];
    if (!data) return null;

    const widthClass = data.groups.length === 3 ? "w-[900px]" : data.groups.length === 2 ? "w-[600px]" : "w-[340px]";

    return (
      <div 
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 origin-top z-50 perspective-1000",
          widthClass,
          activeMenu === key ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible pointer-events-none"
        )}
        onMouseEnter={() => handleMenuEnter(key)}
        onMouseLeave={handleMenuLeave}
      >
        <div className="absolute -top-6 left-0 w-full h-10 bg-transparent" />
        
        <div className="bg-popover rounded-[28px] shadow-2xl shadow-black/10 border border-border p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary" />
          
          <div className={cn("grid gap-6", `grid-cols-${data.groups.length}`)}>
            {data.groups.map((group, idx) => (
              <div key={idx} className={cn("space-y-3", idx < data.groups.length - 1 && "border-r border-border pr-6")}>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground pl-1">{group.title}</h3>
                <div className="grid gap-1">
                  {group.items.map((item) => <RichCard key={item.title} item={item} />)}
                </div>
              </div>
            ))}
          </div>

          {data.cta && (
            <div className="mt-6 pt-4 border-t border-border flex justify-center">
              <Link href={data.cta.href} className="group flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                {data.cta.text}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={cn(
        "fixed left-0 right-0 z-50 flex justify-center transition-all duration-500 px-4",
        isScrolled ? "top-4" : "top-6"
      )}>
        <header 
          className={cn(
            "w-full max-w-[1440px] flex items-center justify-between transition-all duration-500",
            isScrolled 
              ? "bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg rounded-2xl py-2 pl-4 pr-3 supports-[backdrop-filter]:bg-background/60" 
              : "bg-transparent py-2 px-0"
          )}
        >
          <Link href="/" className="relative z-50 group shrink-0 ml-2">
            <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                    <div className="w-full h-full bg-primary rounded-lg flex items-center justify-center shadow-sm">
                        <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
                    </div>
                </div>
                <span className="font-bold text-lg tracking-tight hidden sm:block text-foreground">Facillit Hub</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 bg-background/50 backdrop-blur-md px-1.5 py-1.5 rounded-full border border-border/50 shadow-sm relative">
            <Link href="/" className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-background rounded-full transition-all">
              Início
            </Link>
            <NavTrigger label="Ecossistema" isActive={activeMenu === 'ecossistema'} onEnter={() => handleMenuEnter('ecossistema')} onLeave={handleMenuLeave} />
            <NavTrigger label="Explorar" isActive={activeMenu === 'explorar'} onEnter={() => handleMenuEnter('explorar')} onLeave={handleMenuLeave} />
            <NavTrigger label="Recursos" isActive={activeMenu === 'recursos'} onEnter={() => handleMenuEnter('recursos')} onLeave={handleMenuLeave} />
            <Link href="/precos" className="px-5 py-2 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-background rounded-full transition-all">
              Preços
            </Link>
            <NavTrigger label="Suporte" isActive={activeMenu === 'suporte'} onEnter={() => handleMenuEnter('suporte')} onLeave={handleMenuLeave} />

            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0">
               {renderMegaMenu('ecossistema')}
               {renderMegaMenu('explorar')}
               {renderMegaMenu('recursos')}
               {renderMegaMenu('suporte')}
            </div>
          </nav>

          <div className="hidden lg:flex relative items-center gap-2" onMouseEnter={() => handleMenuEnter('conta')} onMouseLeave={handleMenuLeave}>
             <div className="absolute top-full right-0 w-0 h-0">
                <div 
                  className={cn(
                    "absolute top-4 right-0 w-[380px] transition-all duration-300 origin-top-right z-50 perspective-1000",
                    activeMenu === 'conta' ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible pointer-events-none"
                  )}
                >
                  <div className="absolute -top-6 right-0 w-full h-10 bg-transparent" />
                  <div className="bg-popover rounded-[24px] shadow-2xl shadow-black/10 border border-border p-6 relative overflow-hidden">
                    <div className="text-center mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-2 shadow-lg ring-4 ring-background">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground text-sm">Acessar Facillit Hub</h3>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Gerencie seu ecossistema</p>
                    </div>
                    <div className="space-y-4">
                       {menuData.conta.groups.map((group, idx) => (
                          <div key={idx}>
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 pl-1">{group.title}</h4>
                             <div className="grid gap-1">
                                {group.items.map(item => <RichCard key={item.title} item={item} />)}
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
                </div>
             </div>

             <button className={cn(
               "flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full font-bold text-sm transition-all border",
               activeMenu === 'conta' 
                 ? "bg-foreground text-background border-foreground shadow-md ring-2 ring-primary/20" 
                 : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
             )}>
                <span>Minha Conta</span>
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-colors", activeMenu === 'conta' ? "bg-background/20" : "bg-muted")}>
                    <UserCog className="w-4 h-4" />
                </div>
             </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 text-foreground bg-background rounded-full shadow-sm border border-border hover:bg-muted active:scale-95 transition-all"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>
      </div>

      <div 
        className={cn("fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 lg:hidden", mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={cn(
        "fixed top-0 right-0 z-[70] w-[85%] max-w-[400px] h-full bg-background shadow-2xl transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) lg:hidden flex flex-col border-l border-border",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-xl font-bold text-foreground tracking-tight">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-muted rounded-full text-muted-foreground hover:text-destructive transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl font-bold text-foreground">
            Início
          </Link>

          {['ecossistema', 'explorar', 'recursos', 'suporte', 'conta'].map((key) => {
             const section = menuData[key];
             const isOpen = activeMobileSection === key;
             return (
               <div key={key} className="border-b border-border/50 last:border-0">
                 <button 
                   onClick={() => setActiveMobileSection(isOpen ? null : key)} 
                   className={cn("flex items-center justify-between w-full py-5 px-2 rounded-xl transition-all", isOpen ? "bg-muted/30" : "")}
                 >
                   <span className={cn("font-bold text-lg", isOpen ? 'text-primary' : 'text-foreground')}>{section.label}</span>
                   <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen ? "rotate-180 text-primary" : "text-muted-foreground")} />
                 </button>
                 <div className={cn("grid transition-all duration-300", isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0')}>
                   <div className="overflow-hidden px-2 space-y-6 pt-2">
                     {section.groups.map((group, idx) => (
                       <div key={idx}>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 pl-1">{group.title}</h4>
                         <div className="grid gap-1">
                           {group.items.map(item => (
                             <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-lg active:bg-muted">
                               <div className={cn("p-1.5 rounded-lg shrink-0", item.bg)}>
                                  <item.icon className={cn("w-4 h-4", item.color)} />
                               </div>
                               <div>
                                 <span className="block text-sm font-bold text-foreground">{item.title}</span>
                                 <span className="text-[10px] text-muted-foreground line-clamp-1">{item.desc}</span>
                               </div>
                             </Link>
                           ))}
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             );
          })}
          
          <Link href="/precos" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-4 font-bold text-foreground rounded-xl hover:bg-muted">
            Preços <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </Link>
        </div>

        <div className="p-6 border-t border-border bg-muted/10">
          <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block w-full py-4 text-center font-bold text-primary-foreground bg-primary rounded-xl shadow-lg mb-3 active:scale-[0.98] transition-transform">
            Acessar Conta
          </Link>
        </div>
      </div>
    </>
  );
}