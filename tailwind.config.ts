import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Mapeando nossas pastas de arquitetura [cite: 120-123]
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Configuração da Fonte Inter
      fontFamily: {
        sans: ['var(--font-inter)'], 
      },
      // Suas Cores da Marca
      colors: {
        brand: {
          purple: '#42047e',
          green: '#07f49e',
          dark: '#0f0f11',
          light: '#f3f4f6',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Gradiente Padrão Facillit
      backgroundImage: {
        'facillit-gradient': 'linear-gradient(to right, #42047e, #07f49e)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;