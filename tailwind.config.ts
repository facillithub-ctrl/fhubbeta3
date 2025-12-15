import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/domains/**/*.{js,ts,jsx,tsx,mdx}", 
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          purple: '#42047e',
          green: '#07f49e',
          dark: '#0f0f11',
          light: '#f3f4f6',
        },
      },
      backgroundImage: {
        // Alinhado com o nome usado no seu Header.tsx
        'brand-gradient': 'linear-gradient(to right, #42047e, #07f49e)', 
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'], 
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;