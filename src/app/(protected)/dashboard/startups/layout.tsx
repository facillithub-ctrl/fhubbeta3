import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startups Ecosystem",
  description: "Gerenciamento do módulo Startups Ecosystem",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full space-y-6">
      {children}
    </div>
  );
}
