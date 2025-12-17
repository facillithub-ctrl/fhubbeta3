"use client";

import { useState } from "react";
import { useAccessibility } from "@/shared/providers/accessibility-provider";
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Accessibility, Eye, Type, Monitor, RefreshCw, X, Moon, Sun, Laptop } from "lucide-react";
import { cn } from "@/shared/utils/cn"; // Assumindo que você tem um utilitário cn

export function AccessibilityWidget() {
  const { state, updateState, reset } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-[9999] h-12 w-12 rounded-full shadow-2xl bg-primary text-primary-foreground hover:scale-110 transition-transform"
          aria-label="Opções de Acessibilidade"
        >
          <Accessibility className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[380px] p-0 overflow-hidden border-2 z-[9999]">
        {/* Cabeçalho Customizado */}
        <div className="bg-muted/50 p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2 font-semibold">
                <Accessibility className="h-5 w-5 text-primary" />
                <DialogTitle>Acessibilidade</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
            </Button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* 1. TEMA (Infraestrutura Básica) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Aparência</h4>
            <div className="grid grid-cols-3 gap-2 bg-muted/30 p-1 rounded-lg">
                <Button 
                    variant={state.theme === 'light' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="h-8"
                    onClick={() => updateState('theme', 'light')}
                >
                    <Sun className="h-4 w-4 mr-2" /> Claro
                </Button>
                <Button 
                    variant={state.theme === 'dark' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="h-8"
                    onClick={() => updateState('theme', 'dark')}
                >
                    <Moon className="h-4 w-4 mr-2" /> Escuro
                </Button>
                <Button 
                    variant={state.theme === 'system' ? 'default' : 'ghost'} 
                    size="sm" 
                    className="h-8"
                    onClick={() => updateState('theme', 'system')}
                >
                    <Laptop className="h-4 w-4 mr-2" /> Auto
                </Button>
            </div>
          </div>

          {/* 2. LEITURA */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
               <Type className="h-3 w-3" /> Leitura
            </h4>
            
            <div className="flex items-center justify-between">
              <Label className="text-sm">Tamanho do Texto</Label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button 
                    className={cn("px-3 py-1 hover:bg-muted transition", state.fontSize === 'normal' && "bg-primary text-primary-foreground")}
                    onClick={() => updateState('fontSize', 'normal')}
                >A</button>
                <div className="w-[1px] h-4 bg-border"></div>
                <button 
                    className={cn("px-3 py-1 text-lg hover:bg-muted transition", state.fontSize === 'lg' && "bg-primary text-primary-foreground")}
                    onClick={() => updateState('fontSize', 'lg')}
                >A</button>
                <div className="w-[1px] h-4 bg-border"></div>
                <button 
                    className={cn("px-3 py-1 text-xl hover:bg-muted transition", state.fontSize === 'xl' && "bg-primary text-primary-foreground")}
                    onClick={() => updateState('fontSize', 'xl')}
                >A</button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reading-mode">Modo Dislexia</Label>
              <Switch
                id="reading-mode"
                checked={state.readingMode}
                onCheckedChange={(c) => updateState("readingMode", c)}
              />
            </div>
          </div>

          {/* 3. VISUAL */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
               <Eye className="h-3 w-3" /> Visual
            </h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="contrast">Alto Contraste</Label>
              <Switch
                id="contrast"
                checked={state.contrast === "high"}
                onCheckedChange={(c) => updateState("contrast", c ? "high" : "normal")}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="saturation">Sem Cores (Foco)</Label>
              <Switch
                id="saturation"
                checked={state.saturation === "zero"}
                onCheckedChange={(c) => updateState("saturation", c ? "zero" : "normal")}
              />
            </div>
          </div>

          {/* 4. SISTEMA */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
               <Monitor className="h-3 w-3" /> Sistema
            </h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="motion">Reduzir Animações</Label>
              <Switch
                id="motion"
                checked={state.reduceMotion}
                onCheckedChange={(c) => updateState("reduceMotion", c)}
              />
            </div>
          </div>
        </div>

        {/* RODAPÉ */}
        <div className="p-4 bg-muted/30 border-t flex gap-2">
            <Button variant="outline" size="sm" className="w-full gap-2 text-xs" onClick={reset}>
              <RefreshCw className="h-3 w-3" /> Restaurar
            </Button>
            <Button variant="ghost" size="sm" className="w-full gap-2 text-xs text-destructive hover:bg-destructive/10" onClick={() => { setIsOpen(false); setIsVisible(false); }}>
              Ocultar Botão
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}