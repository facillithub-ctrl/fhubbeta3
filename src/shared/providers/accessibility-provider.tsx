"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Tipos de Daltonismo
type ColorBlindnessType = 
  | "none"
  | "protanomaly" | "deuteranomaly" | "tritanomaly"
  | "protanopia" | "deuteranopia" | "tritanopia"
  | "achromatopsia";

type AccState = {
  // Visual
  theme: "light" | "dark" | "system";
  contrast: "normal" | "high";
  saturation: "normal" | "low" | "monochrome"; 
  colorBlindness: ColorBlindnessType;
  
  // Tipografia
  fontSize: "normal" | "lg" | "xl";
  letterSpacing: "normal" | "wide" | "wider";
  lineHeight: "normal" | "relaxed" | "loose";
  fontDyslexic: boolean;

  // Motor & Foco
  cursorBig: boolean;
  focusStrong: boolean;
  hideImages: boolean;
  reduceMotion: boolean;
  
  // Placeholders para o futuro (UI Only por enquanto)
  readingGuide: boolean;
  screenReader: boolean;
  vlibras: boolean;
};

const defaultState: AccState = {
  theme: "system",
  contrast: "normal",
  saturation: "normal",
  colorBlindness: "none",
  fontSize: "normal",
  letterSpacing: "normal",
  lineHeight: "normal",
  fontDyslexic: false,
  cursorBig: false,
  focusStrong: false,
  hideImages: false,
  reduceMotion: false,
  readingGuide: false,
  screenReader: false,
  vlibras: false,
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

  // 1. Carregar preferências no mount
  useEffect(() => {
    const saved = localStorage.getItem("fhub-acc-v4");
    if (saved) {
      try { setState({ ...defaultState, ...JSON.parse(saved) }); } 
      catch (e) { console.error("Erro prefs", e); }
    }
    setMounted(true);
  }, []);

  // 2. Aplicar efeitos no DOM
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const cl = root.classList;

    // --- Tema & Contraste ---
    cl.remove("dark", "acc-contrast-high");
    if (state.contrast === 'high') {
        cl.add("acc-contrast-high");
    } else if (state.theme === "dark" || (state.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        cl.add("dark");
    }

    // --- Filtros de Cor (SVG + CSS Filters) ---
    // Ordem de prioridade: Daltonismo > Monocromático > Saturação Baixa
    if (state.colorBlindness !== "none") {
        root.style.filter = `url(#acc-filter-${state.colorBlindness})`;
    } else if (state.saturation === "monochrome") {
        root.style.filter = "grayscale(100%)";
    } else if (state.saturation === "low") {
        root.style.filter = "saturate(50%)";
    } else {
        root.style.filter = "";
    }

    // --- Tipografia ---
    const fontScale = state.fontSize === 'xl' ? '1.25' : state.fontSize === 'lg' ? '1.1' : '1';
    const lSpacing = state.letterSpacing === 'wider' ? '0.1em' : state.letterSpacing === 'wide' ? '0.05em' : 'normal';
    const lHeight = state.lineHeight === 'loose' ? '2' : state.lineHeight === 'relaxed' ? '1.8' : '1.5';

    root.style.setProperty("--acc-font-scale", fontScale);
    root.style.setProperty("--acc-letter-spacing", lSpacing);
    root.style.setProperty("--acc-line-height", lHeight);

    // --- Classes Utilitárias ---
    cl.toggle("acc-font-dyslexic", state.fontDyslexic);
    cl.toggle("acc-cursor-big", state.cursorBig);
    cl.toggle("acc-focus-strong", state.focusStrong);
    cl.toggle("acc-hide-images", state.hideImages);
    
    // --- Movimento ---
    if (state.reduceMotion) {
        root.style.setProperty("scroll-behavior", "auto");
        cl.add("motion-reduce"); 
    } else {
        root.style.removeProperty("scroll-behavior");
        cl.remove("motion-reduce");
    }

    localStorage.setItem("fhub-acc-v4", JSON.stringify(state));

  }, [state, mounted]);

  const updateState = (key: keyof AccState, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => setState(defaultState);

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