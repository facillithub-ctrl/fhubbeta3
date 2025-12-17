"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AccState = {
  fontSize: "normal" | "lg" | "xl";
  contrast: "normal" | "high";
  saturation: "normal" | "zero"; // Para daltonismo/foco
  readingMode: boolean; // Espaçamento e fonte amigável
  reduceMotion: boolean;
};

const defaultState: AccState = {
  fontSize: "normal",
  contrast: "normal",
  saturation: "normal",
  readingMode: false,
  reduceMotion: false,
};

type AccessibilityContextType = {
  state: AccState;
  updateState: (key: keyof AccState, value: any) => void;
  reset: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AccState>(defaultState);
  const [mounted, setMounted] = useState(false);

  // 1. Carregar do localStorage e Preferências do SO na montagem
  useEffect(() => {
    const saved = localStorage.getItem("fhub-accessibility");
    if (saved) {
      setState(JSON.parse(saved));
    } else {
      // Detecção automática do SO (opcional, conforme seu conceito)
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) setState((s) => ({ ...s, reduceMotion: true }));
    }
    setMounted(true);
  }, []);

  // 2. Aplicar classes no HTML quando o estado muda
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const classesToAdd: string[] = [];
    const classesToRemove = [
      "acc-text-lg", "acc-text-xl",
      "acc-contrast-high",
      "acc-sat-0",
      "acc-mode-reading",
      "acc-motion-reduce"
    ];

    // Mapeamento de Estado -> Tokens (Classes)
    if (state.fontSize === "lg") classesToAdd.push("acc-text-lg");
    if (state.fontSize === "xl") classesToAdd.push("acc-text-xl");
    if (state.contrast === "high") classesToAdd.push("acc-contrast-high");
    if (state.saturation === "zero") classesToAdd.push("acc-sat-0");
    if (state.readingMode) classesToAdd.push("acc-mode-reading");
    if (state.reduceMotion) classesToAdd.push("acc-motion-reduce");

    root.classList.remove(...classesToRemove);
    if (classesToAdd.length > 0) root.classList.add(...classesToAdd);

    // Persistência
    localStorage.setItem("fhub-accessibility", JSON.stringify(state));

  }, [state, mounted]);

  const updateState = (key: keyof AccState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setState(defaultState);

  // Evita Hydration Mismatch renderizando children apenas após montar, 
  // ou renderiza children diretamente se não se importar com um leve flash de estilo inicial.
  // Para acessibilidade crítica, é melhor renderizar direto e corrigir no effect.
  return (
    <AccessibilityContext.Provider value={{ state, updateState, reset }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return context;
};