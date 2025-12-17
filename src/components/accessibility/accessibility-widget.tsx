"use client";

import { useState } from "react";
import { useAccessibility } from "@/shared/providers/accessibility-provider";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"; // Verifique se o caminho do seu Dialog está correto
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Accessibility, Eye, Type, Monitor, RefreshCw, X } from "lucide-react";

export function AccessibilityWidget() {
  const { state, updateState, reset } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // O usuário pode "fechar" o widget temporariamente

  if (!isVisible) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Botão Flutuante */}
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-xl bg-primary hover:scale-110 transition-transform"
          aria-label="Opções de Acessibilidade"
        >
          <Accessibility className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>

      {/* Painel de Preferências */}
      <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Ferramentas de Acessibilidade
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          
          {/* Seção: Leitura */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Type className="h-4 w-4" /> Leitura e Texto
            </h4>
            
            <div className="flex items-center justify-between">
              <Label>Tamanho da Fonte</Label>
              <div className="flex gap-1">
                <Button 
                    variant={state.fontSize === 'normal' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => updateState('fontSize', 'normal')}
                >A</Button>
                <Button 
                    variant={state.fontSize === 'lg' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => updateState('fontSize', 'lg')}
                >A+</Button>
                <Button 
                    variant={state.fontSize === 'xl' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => updateState('fontSize', 'xl')}
                >A++</Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reading-mode">Modo Leitura (Dislexia)</Label>
              <Switch
                id="reading-mode"
                checked={state.readingMode}
                onCheckedChange={(c) => updateState("readingMode", c)}
              />
            </div>
          </div>

          {/* Seção: Visual */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" /> Visual e Cor
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
              <Label htmlFor="saturation">Escala de Cinza (Foco)</Label>
              <Switch
                id="saturation"
                checked={state.saturation === "zero"}
                onCheckedChange={(c) => updateState("saturation", c ? "zero" : "normal")}
              />
            </div>
          </div>

          {/* Seção: Sistema */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Monitor className="h-4 w-4" /> Sistema
            </h4>

            <div className="flex items-center justify-between">
              <Label htmlFor="motion">Reduzir Movimento</Label>
              <Switch
                id="motion"
                checked={state.reduceMotion}
                onCheckedChange={(c) => updateState("reduceMotion", c)}
              />
            </div>
          </div>

          {/* Ações do Rodapé */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="w-full gap-2" onClick={reset}>
              <RefreshCw className="h-4 w-4" /> Restaurar Padrão
            </Button>
            <Button variant="ghost" className="w-full gap-2 text-destructive" onClick={() => { setIsOpen(false); setIsVisible(false); }}>
              <X className="h-4 w-4" /> Ocultar Botão
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}