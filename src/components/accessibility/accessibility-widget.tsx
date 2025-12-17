"use client";

import { useState, useEffect } from "react";
import { useAccessibility } from "@/shared/providers/accessibility-provider";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle, DialogDescription } from "@/shared/ui/dialog";
import { Switch } from "@/shared/ui/switch";
import { 
  Accessibility, RefreshCw, X, Sun, Moon, Laptop, Eye, Type, 
  Activity, Palette, Check, ChevronDown, Hand, MousePointer2, 
  Image as ImageIcon, Focus, Languages, Ear, Brain, Lock, Globe,
  MessageSquare, Keyboard, Fingerprint, Volume2
} from "lucide-react";
import { cn } from "@/shared/utils/cn";

// --- Filtros SVG ---
const SVGFilters = () => (
  <svg className="sr-only" aria-hidden="true">
    <defs>
      <filter id="acc-filter-protanomaly"><feColorMatrix type="matrix" values="0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0" /></filter>
      <filter id="acc-filter-deuteranomaly"><feColorMatrix type="matrix" values="0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0" /></filter>
      <filter id="acc-filter-tritanomaly"><feColorMatrix type="matrix" values="0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0" /></filter>
      <filter id="acc-filter-protanopia"><feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" /></filter>
      <filter id="acc-filter-deuteranopia"><feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" /></filter>
      <filter id="acc-filter-tritanopia"><feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" /></filter>
      <filter id="acc-filter-achromatopsia"><feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0" /></filter>
    </defs>
  </svg>
);

export function AccessibilityWidget() {
  const { state, updateState, reset } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      <SVGFilters />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 border-2 border-background ring-4 ring-primary/10"
            aria-label="Acessibilidade"
          >
            <Accessibility className="h-7 w-7" />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[850px] w-[95vw] p-0 border border-border shadow-2xl rounded-2xl gap-0 h-[85vh] md:h-[650px] flex flex-col overflow-hidden bg-background" aria-describedby="acc-desc">
          {/* Adicionado Description Oculto para silenciar erro do console */}
          <DialogDescription id="acc-desc" className="sr-only">
            Painel de controle de acessibilidade para ajustar cores, fontes e movimento.
          </DialogDescription>

          <div className="flex items-center justify-between p-4 md:p-5 border-b border-border bg-background z-20 shrink-0">
              <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <Accessibility className="h-5 w-5" />
                  </div>
                  <div>
                      <DialogTitle className="text-sm font-bold text-foreground uppercase tracking-wide">Acessibilidade</DialogTitle>
                      <p className="text-[11px] text-muted-foreground font-medium">Personalize sua experiência</p>
                  </div>
              </div>
              <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted rounded-full">
                      <X className="h-5 w-5" />
                  </Button>
              </DialogClose>
          </div>

          <div className="flex-1 overflow-hidden md:grid md:grid-cols-[1.6fr_1fr] bg-background">
            
            {/* === COLUNA 1: CONTROLES === */}
            <div className="h-full overflow-y-auto custom-scrollbar p-5 space-y-8 bg-background">
                
                <section className="space-y-4">
                    <SectionHeader icon={<Palette className="h-4 w-4" />} title="Visual & Cores" />
                    <div className="grid grid-cols-3 gap-2">
                        <ThemeCard active={state.theme === 'light'} onClick={() => updateState('theme', 'light')} icon={<Sun className="h-4 w-4" />} label="Claro" />
                        <ThemeCard active={state.theme === 'dark'} onClick={() => updateState('theme', 'dark')} icon={<Moon className="h-4 w-4" />} label="Escuro" />
                        <ThemeCard active={state.theme === 'system'} onClick={() => updateState('theme', 'system')} icon={<Laptop className="h-4 w-4" />} label="Sistema" />
                    </div>
                    <div className="grid gap-2 pt-1">
                        <ToggleRow 
                            icon={<Eye className="h-4 w-4" />} 
                            label="Alto Contraste" 
                            checked={state.contrast === 'high'} 
                            onChange={(c) => updateState('contrast', c ? 'high' : 'normal')} 
                        />
                        <div className="bg-background border border-border rounded-xl p-1 relative group hover:border-primary/50 transition-colors">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                <Palette className="h-4 w-4" />
                            </div>
                            <select 
                                className="w-full h-10 pl-10 pr-8 text-xs font-medium bg-transparent outline-none cursor-pointer text-foreground appearance-none"
                                value={state.colorBlindness}
                                onChange={(e) => updateState('colorBlindness', e.target.value)}
                            >
                                <option value="none">Cores Padrão</option>
                                <optgroup label="Tricromacia (Parcial)">
                                    <option value="protanomaly">Vermelho Fraco</option>
                                    <option value="deuteranomaly">Verde Fraco</option>
                                    <option value="tritanomaly">Azul Fraco</option>
                                </optgroup>
                                <optgroup label="Dicromacia (Total)">
                                    <option value="protanopia">Sem Vermelho</option>
                                    <option value="deuteranopia">Sem Verde</option>
                                    <option value="tritanopia">Sem Azul</option>
                                </optgroup>
                                <optgroup label="Monocromacia">
                                    <option value="achromatopsia">Escala de Cinza</option>
                                </optgroup>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                <ChevronDown className="h-3 w-3" />
                            </div>
                        </div>
                        <ToggleRow 
                            icon={<Palette className="h-4 w-4" />} 
                            label="Modo Monocromático" 
                            checked={state.saturation === 'monochrome'} 
                            onChange={(c) => updateState('saturation', c ? 'monochrome' : 'normal')} 
                        />
                    </div>
                </section>

                <section className="space-y-4">
                    <SectionHeader icon={<Type className="h-4 w-4" />} title="Tipografia" />
                    <div className="bg-background border border-border rounded-xl p-3 space-y-3">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                <span>Tamanho</span>
                            </div>
                            <div className="flex gap-1 bg-muted/20 p-1 rounded-lg">
                                {['normal', 'lg', 'xl'].map((s) => (
                                    <Button key={s} variant="ghost" className={cn("flex-1 h-7 text-xs rounded-md transition-all hover:bg-background", state.fontSize === s && "bg-background shadow-sm text-primary font-bold ring-1 ring-border")} onClick={() => updateState('fontSize', s)}>
                                        {s === 'normal' ? 'Aa' : s === 'lg' ? 'Aa+' : 'Aa++'}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ToggleRow 
                        icon={<Languages className="h-4 w-4" />} 
                        label="Fonte para Dislexia" 
                        checked={state.fontDyslexic} 
                        onChange={(c) => updateState('fontDyslexic', c)} 
                    />
                </section>

                <section className="space-y-4">
                    <SectionHeader icon={<Brain className="h-4 w-4" />} title="Cognitivo" />
                    <div className="grid gap-2">
                        <ToggleRow icon={<MousePointer2 className="h-4 w-4" />} label="Cursor Ampliado" checked={state.cursorBig} onChange={(c) => updateState('cursorBig', c)} />
                        <ToggleRow icon={<Focus className="h-4 w-4" />} label="Foco Forte" checked={state.focusStrong} onChange={(c) => updateState('focusStrong', c)} />
                        <ToggleRow icon={<Activity className="h-4 w-4" />} label="Reduzir Movimento" checked={state.reduceMotion} onChange={(c) => updateState('reduceMotion', c)} />
                        <ToggleRow icon={<ImageIcon className="h-4 w-4" />} label="Ocultar Imagens" checked={state.hideImages} onChange={(c) => updateState('hideImages', c)} />
                    </div>
                </section>

                <section className="space-y-3 pt-2 pb-6">
                    <SectionHeader icon={<Check className="h-4 w-4" />} title="Em Breve" />
                    <div className="grid grid-cols-1 gap-2 opacity-50 pointer-events-none">
                        <ComingSoonRow icon={<Hand className="h-4 w-4" />} label="VLibras / Sinais" />
                        <ComingSoonRow icon={<Volume2 className="h-4 w-4" />} label="Leitor de Tela (TTS)" />
                        <ComingSoonRow icon={<MessageSquare className="h-4 w-4" />} label="Legendas Auto" />
                        <ComingSoonRow icon={<Globe className="h-4 w-4" />} label="Tradução" />
                        <ComingSoonRow icon={<Fingerprint className="h-4 w-4" />} label="Login Biométrico" />
                        <ComingSoonRow icon={<Keyboard className="h-4 w-4" />} label="Atalhos Custom" />
                    </div>
                </section>

                <div className="pt-2 sticky bottom-0 bg-background pb-1">
                    <Button variant="outline" size="sm" className="w-full text-xs font-medium h-9 border-border bg-background hover:bg-muted" onClick={reset}>
                        <RefreshCw className="h-3.5 w-3.5 mr-2" /> Restaurar Padrões
                    </Button>
                </div>
            </div>

            {/* === COLUNA 2: EDUCATIVA === */}
            <div className="bg-background md:border-l border-border relative flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/20 ring-1 ring-border text-primary shrink-0">
                        <Accessibility className="h-6 w-6" />
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                            Design Universal
                        </h2>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            O Facillit Hub segue as diretrizes <strong>WCAG 2.1 nível AA</strong>. Nosso objetivo é garantir que a plataforma seja perceptível, operável e compreensível para todos.
                        </p>
                    </div>

                    <div className="space-y-4 pt-2">
                        <InfoItem title="Visão" desc="Filtros para daltonismo (Protanopia, Deuteranopia, Tritanopia) e alto contraste para baixa visão." />
                        <InfoItem title="Cognição" desc="Fontes 'OpenDyslexic', espaçamento de texto ajustável e redução de distrações visuais." />
                        <InfoItem title="Motor" desc="Navegação otimizada para teclado, áreas de clique ampliadas e redução de movimentos." />
                    </div>
                </div>

                <div className="p-4 border-t border-border text-center bg-background shrink-0">
                    <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                        Powered by Facillit A11y Engine
                    </p>
                </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Sub-componentes
function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
    return <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1">{icon} {title}</h4>
}

function ThemeCard({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button onClick={onClick} className={cn("flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 group relative overflow-hidden h-20 bg-background hover:bg-muted/30", active ? "border-primary text-primary ring-1 ring-primary/20 bg-primary/5" : "border-border text-muted-foreground hover:text-foreground")}>
            {active && <div className="absolute top-1.5 right-1.5"><Check className="h-3 w-3" /></div>}
            <div className={cn("transition-transform duration-300 group-hover:scale-110", active && "scale-110")}>{icon}</div>
            <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
        </button>
    )
}

function ToggleRow({ icon, label, checked, onChange }: { icon: React.ReactNode, label: string, checked: boolean, onChange: (c: boolean) => void }) {
    return (
        <div className={cn("flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer group h-12 bg-background hover:bg-muted/30", checked ? "border-primary/50 bg-primary/5" : "border-border")} onClick={() => onChange(!checked)}>
            <div className="flex items-center gap-3">
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors", checked ? "bg-primary text-primary-foreground" : "bg-muted/20 text-muted-foreground group-hover:text-primary")}>{icon}</div>
                <span className={cn("text-xs font-semibold", checked ? "text-primary" : "text-foreground")}>{label}</span>
            </div>
            <Switch checked={checked} onCheckedChange={onChange} className="scale-90 data-[state=checked]:bg-primary" />
        </div>
    )
}

function ComingSoonRow({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-border bg-muted/5 h-10 select-none">
            <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full flex items-center justify-center bg-muted/20 text-muted-foreground">{icon}</div>
                <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
            </div>
            <span className="text-[8px] font-bold uppercase bg-muted/10 text-muted-foreground px-1.5 py-0.5 rounded border border-border">Em breve</span>
        </div>
    )
}

function InfoItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-3">
            <div className="w-1 h-full min-h-[2rem] bg-primary/20 rounded-full" />
            <div>
                <h5 className="text-sm font-bold text-foreground">{title}</h5>
                <p className="text-[11px] text-muted-foreground leading-snug">{desc}</p>
            </div>
        </div>
    )
}