"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';
import { 
  ChevronDown, Menu, X, 
  PenTool, ClipboardCheck, PlayCircle, Gamepad2, BookOpen, Workflow,
  School, FlaskConical,
  IdCard, Network, Users, CreditCard, Code2, 
  Calendar, TrendingUp, MessageCircle,
  Scale, Accessibility, Briefcase, Share2, Newspaper,
  Headset, CircleHelp, Handshake, ShieldCheck 
} from 'lucide-react';

// --- Estrutura de Dados ---
const ecossistema = {
  "For Education": [
    { title: "Facillit Write", href: "/modulos/facillit-write", desc: "Redação e correção IA", icon: PenTool },
    { title: "Facillit Test", href: "/modulos/facillit-test", desc: "Simulados e Provas", icon: ClipboardCheck },
    { title: "Facillit Play", href: "/modulos/facillit-play", desc: "Streaming Educacional", icon: PlayCircle },
    { title: "Facillit Games", href: "/modulos/facillit-games", desc: "Aprendizagem lúdica", icon: Gamepad2 },
    { title: "Facillit Library", href: "/modulos/facillit-library", desc: "Biblioteca digital", icon: BookOpen },
    { title: "Facillit Create", href: "/modulos/facillit-create", desc: "Mapas mentais", icon: Workflow },
  ],
  "For Schools": [
    { title: "Facillit Edu", href: "/modulos/facillit-edu", desc: "Gestão Pedagógica", icon: School },
    { title: "Facillit Lab", href: "/modulos/facillit-lab", desc: "Laboratório Virtual", icon: FlaskConical },
  ],
  "For Enterprise": [
    { title: "Facillit Access", href: "/modulos/facillit-access", desc: "Gestão de Acessos", icon: IdCard },
    { title: "Facillit Center", href: "/modulos/facillit-center", desc: "Central de Operações", icon: Network },
    { title: "Facillit People", href: "/modulos/facillit-people", desc: "Gestão de RH", icon: Users },
    { title: "Facillit Card", href: "/modulos/facillit-card", desc: "Benefícios", icon: CreditCard },
    { title: "Facillit API", href: "/modulos/facillit-api", desc: "Integração", icon: Code2 },
  ],
  "Global": [
    { title: "Facillit Day", href: "/modulos/facillit-day", desc: "Agenda e Hábitos", icon: Calendar },
    { title: "Facillit Finances", href: "/modulos/facillit-finances", desc: "Gestão Financeira", icon: TrendingUp },
    { title: "Facillit Stories", href: "/modulos/facillit-stories", desc: "Comunidade literária", icon: MessageCircle },
  ],
};

const recursos = [
  { title: "Avisos Legais", href: "/recursos/legal", icon: Scale },
  { title: "Acessibilidade", href: "/recursos/acessibilidade", icon: Accessibility },
  { title: "Trabalhe Conosco", href: "/recursos/carreiras", icon: Briefcase },
  { title: "Atualizações", href: "/recursos/atualizacoes", icon: Share2 },
  { title: "Blog", href: "/recursos/blog", icon: Newspaper },
];

const suporte = [
  { title: "Fale Conosco", href: "/recursos/contato", icon: Headset },
  { title: "FAQ", href: "/recursos/ajuda", icon: CircleHelp },
  { title: "Vendas", href: "/recursos/vendas", icon: Handshake },
  { title: "Facillit Account", href: "/dashboard/account", icon: ShieldCheck, highlight: true }, 
];

// --- Componente Mobile Accordion (Melhorado) ---
const MobileAccordion = ({ title, isOpen, toggle, children }: { title: string, isOpen: boolean, toggle: () => void, children: React.ReactNode }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button onClick={toggle} className="flex items-center justify-between w-full py-5 text-left group">
      <span className={cn("font-bold text-lg transition-colors", isOpen ? 'text-brand-purple' : 'text-gray-800')}>{title}</span>
      <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isOpen ? 'rotate-180 text-brand-purple' : 'text-gray-400')} />
    </button>
    <div className={cn("grid transition-all duration-300 ease-in-out overflow-hidden", isOpen ? 'grid-rows-[1fr] opacity-100 mb-4' : 'grid-rows-[0fr] opacity-0')}>
      <div className="overflow-hidden pl-2">{children}</div>
    </div>
  </div>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
        const offset = window.scrollY;
        setIsScrolled(offset > 20);
    };

    if (isHome) {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    } else {
        setIsScrolled(true);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMobileSection(null);
  }, [pathname]);

  const navContainerClasses = cn(
    "fixed top-0 left-0 w-full z-50 flex justify-center font-sans transition-all duration-300",
    isScrolled ? "py-2" : "py-4 md:py-6"
  );

  const navInnerClasses = cn(
    "w-full md:w-[95%] max-w-[1400px] transition-all duration-500 ease-out px-6 flex items-center justify-between",
    isScrolled || mobileMenuOpen
        ? "bg-white/95 backdrop-blur-md shadow-sm md:rounded-full py-3 border border-gray-200/50"
        : "bg-transparent py-2"
  );

  const linkColor = "text-gray-700 hover:text-brand-purple";

  return (
    <>
      <header className={navContainerClasses}>
        <div className={navInnerClasses}>
            
            {/* LOGO (Aumentada e Melhorada) */}
            <Link href="/" className="flex items-center group z-50 relative shrink-0">
                {/* Desktop Logo */}
                <div className="relative w-40 h-12 hidden md:block">
                    <Image 
                        src="/assets/images/LOGO/logotipo/logo preta (1).png"
                        alt="Facillit Hub Logo"
                        fill
                        className="object-contain object-left"
                        priority
                        sizes="(max-width: 768px) 100vw, 160px"
                    />
                </div>
                {/* Mobile Logo (Isologo/Ícone para economizar espaço ou Logotipo menor) */}
                <div className="relative w-32 h-10 md:hidden block">
                     <Image 
                        src="/assets/images/LOGO/logotipo/logo preta (1).png"
                        alt="Facillit Hub Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className={`text-sm font-bold uppercase tracking-wide transition-colors ${linkColor}`}>Início</Link>

              {/* MEGA MENU ECOSSISTEMA */}
              <div className="group">
                <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide py-4 transition-colors ${linkColor}`}>
                  Ecossistema <ChevronDown className="w-4 h-4 text-brand-purple/70 group-hover:text-brand-purple transition-transform group-hover:rotate-180"/>
                </button>
                
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40 pt-4">
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 p-8 grid grid-cols-4 gap-8 relative ring-1 ring-black/5">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100/50"></div>

                    {Object.entries(ecossistema).map(([category, items]) => (
                        <div key={category}>
                            <h3 className="text-xs font-black text-brand-purple uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">{category}</h3>
                            <ul className="space-y-2">
                                {items.map((item) => (
                                    <li key={item.title}>
                                        <Link href={item.href} className="group/link flex items-start gap-3 hover:bg-brand-light/50 p-2 rounded-xl transition-all">
                                            <div className="mt-1 text-brand-green group-hover/link:text-brand-purple transition-colors">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="block text-sm font-bold text-gray-700 group-hover/link:text-brand-purple transition-colors">{item.title}</span>
                                                <span className="text-[11px] text-gray-500 group-hover/link:text-gray-600 leading-tight block mt-0.5">{item.desc}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/precos" className={`text-sm font-bold uppercase tracking-wide transition-colors ${linkColor}`}>Preços</Link>

              {/* RECURSOS DROPDOWN */}
              <div className="group relative">
                <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide py-4 transition-colors ${linkColor}`}>
                  Recursos <ChevronDown className="w-4 h-4 text-brand-purple/70 group-hover:text-brand-purple transition-transform group-hover:rotate-180"/>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-60">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100/50 p-2 relative ring-1 ring-black/5">
                     <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100/50"></div>
                    {recursos.map(item => (
                        <Link key={item.title} href={item.href} className="flex items-center gap-3 p-3 text-sm font-medium text-gray-600 hover:text-brand-purple hover:bg-brand-light/50 rounded-xl transition-colors">
                            <item.icon className="w-4 h-4 text-brand-green/80" />
                            {item.title}
                        </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUPORTE DROPDOWN */}
              <div className="group relative">
                <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide py-4 transition-colors ${linkColor}`}>
                  Suporte <ChevronDown className="w-4 h-4 text-brand-purple/70 group-hover:text-brand-purple transition-transform group-hover:rotate-180"/>
                </button>
                <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-64">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100/50 p-2 relative ring-1 ring-black/5">
                    <div className="absolute -top-2 right-8 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100/50"></div>
                    {suporte.map(item => (
                        <Link key={item.title} href={item.href} className={cn("flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-colors", item.highlight ? 'bg-brand-purple/5 text-brand-purple hover:bg-brand-purple/10' : 'text-gray-600 hover:text-brand-purple hover:bg-brand-light/50')}>
                            <item.icon className={cn("w-4 h-4", item.highlight ? 'text-brand-purple' : 'text-brand-green/80')} />
                            {item.title}
                        </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* LOGIN BUTTONS */}
            <div className="hidden lg:flex items-center gap-3">
                <Link href="/login" className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-colors hover:bg-gray-100 ${linkColor}`}>
                    Entrar
                </Link>
                <Link href="/register" className="bg-brand-gradient hover:bg-brand-gradient/90 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Criar Conta
                </Link>
            </div>

            {/* MOBILE TOGGLE (Melhorado) */}
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-brand-purple focus:outline-none transition-colors z-50 hover:bg-brand-purple/5 rounded-lg"
                aria-label="Toggle Menu"
            >
                {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY (Design Clean e Espaçado) */}
      <div className={cn("fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-28 px-6 pb-8 overflow-y-auto overscroll-contain", mobileMenuOpen ? 'translate-x-0' : 'translate-x-full')}>
        
        <div className="flex flex-col gap-2 pb-10">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-5 text-xl font-bold text-brand-purple border-b border-gray-100">
                Início
            </Link>
            
            <MobileAccordion title="Ecossistema" isOpen={activeMobileSection === 'eco'} toggle={() => setActiveMobileSection(activeMobileSection === 'eco' ? null : 'eco')}>
                {Object.entries(ecossistema).map(([cat, items]) => (
                    <div key={cat} className="mb-6 last:mb-2 pl-2 border-l-2 border-brand-purple/10 ml-1">
                        <h4 className="text-xs font-black text-brand-purple/60 uppercase mb-3 mt-1 pl-2 tracking-wider">{cat}</h4>
                        {items.map(item => (
                            <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-start gap-3 py-3 pl-2 text-gray-700 hover:text-brand-purple group">
                                <item.icon className="w-6 h-6 text-brand-green group-hover:text-brand-purple transition-colors shrink-0" />
                                <div>
                                    <span className="text-base font-bold block">{item.title}</span>
                                    <span className="text-sm text-gray-400">{item.desc}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </MobileAccordion>

            <Link href="/precos" onClick={() => setMobileMenuOpen(false)} className="py-5 text-xl font-bold text-gray-800 border-b border-gray-100 hover:text-brand-purple transition-colors">
                Preços
            </Link>

            <MobileAccordion title="Recursos" isOpen={activeMobileSection === 'rec'} toggle={() => setActiveMobileSection(activeMobileSection === 'rec' ? null : 'rec')}>
                {recursos.map(item => (
                    <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 py-4 pl-2 text-gray-600 group hover:text-brand-purple border-b border-gray-50 last:border-0">
                        <item.icon className="w-6 h-6 text-brand-green group-hover:text-brand-purple transition-colors shrink-0" />
                        <span className="text-base font-medium">{item.title}</span>
                    </Link>
                ))}
            </MobileAccordion>

            <MobileAccordion title="Suporte" isOpen={activeMobileSection === 'sup'} toggle={() => setActiveMobileSection(activeMobileSection === 'sup' ? null : 'sup')}>
                {suporte.map(item => (
                    <Link key={item.title} href={item.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-4 py-4 pl-2 text-gray-600 group hover:text-brand-purple border-b border-gray-50 last:border-0">
                        <item.icon className={cn("w-6 h-6 transition-colors shrink-0", item.highlight ? "text-brand-purple" : "text-brand-green group-hover:text-brand-purple")} />
                        <span className={cn("text-base font-medium", item.highlight && "font-bold text-brand-purple")}>{item.title}</span>
                    </Link>
                ))}
            </MobileAccordion>
        </div>

        {/* Mobile Footer Actions (Botões maiores) */}
        <div className="mt-auto flex flex-col gap-4 bg-white pt-6 border-t border-gray-100 pb-safe">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 text-center border-2 border-brand-purple text-brand-purple rounded-2xl font-bold text-lg hover:bg-brand-purple/5 transition-colors">
                Entrar
            </Link>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 text-center bg-brand-gradient text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all">
                Criar Conta
            </Link>
        </div>
      </div>
    </>
  );
}