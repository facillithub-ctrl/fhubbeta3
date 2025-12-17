"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Definição do Estado Único de Acessibilidade
type AccState = {
  theme: "light" | "dark" | "system"; // Dark mode é apenas um tema
  fontSize: "normal" | "lg" | "xl";
  contrast: "normal" | "high";
  saturation: "normal" | "zero"; 
  readingMode: boolean;
  reduceMotion: boolean; // Se true, força redução. Se false, respeita SO.
};

const defaultState: AccState = {
  theme: "system",
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

  // 1. BOOT: Carregar LocalStorage + Preferências do SO
  useEffect(() => {
    const saved = localStorage.getItem("fhub-accessibility");
    if (saved) {
      try {
        setState({ ...defaultState, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Erro ao carregar preferências", e);
      }
    } else {
      // Se não tem salvo, detecta movimento reduzido do SO
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) setState((s) => ({ ...s, reduceMotion: true }));
    }
    setMounted(true);
  }, []);

  // 2. REAÇÃO: Aplicar classes no HTML quando o estado muda
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const classesToAdd: string[] = [];
    
    // Lista de todas as classes controladas por tokens para limpar antes de aplicar
    const classesToRemove = [
      "dark", 
      "acc-text-lg", "acc-text-xl",
      "acc-contrast-high",
      "acc-sat-0",
      "acc-mode-reading",
      "acc-motion-reduce"
    ];

    // --- LÓGICA DE TEMA ---
    if (state.theme === "dark") {
      classesToAdd.push("dark");
    } else if (state.theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) classesToAdd.push("dark");
    }

    // --- LÓGICA DE ACESSIBILIDADE ---
    if (state.fontSize === "lg") classesToAdd.push("acc-text-lg");
    if (state.fontSize === "xl") classesToAdd.push("acc-text-xl");
    if (state.contrast === "high") classesToAdd.push("acc-contrast-high");
    if (state.saturation === "zero") classesToAdd.push("acc-sat-0");
    if (state.readingMode) classesToAdd.push("acc-mode-reading");
    
    // Movimento: Respeita escolha do usuário OU sistema
    const systemReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (state.reduceMotion || systemReduceMotion) {
      classesToAdd.push("acc-motion-reduce");
    }

    // Aplicação Atômica (Remove velhas -> Adiciona novas)
    root.classList.remove(...classesToRemove);
    if (classesToAdd.length > 0) root.classList.add(...classesToAdd);

    // Persistência Automática
    localStorage.setItem("fhub-accessibility", JSON.stringify(state));

  }, [state, mounted]);

  const updateState = (key: keyof AccState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setState(defaultState);

  return (
    <AccessibilityContext.Provider value={{ state, updateState, reset }}>
      {/* Evita flash de estilo renderizando o conteúdo apenas após a montagem inicial se crítico,
          mas para acessibilidade geralmente permitimos render e o useEffect ajusta rápido. */}
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider");
  return context;
};