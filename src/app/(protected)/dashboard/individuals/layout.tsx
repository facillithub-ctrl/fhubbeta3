import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Space",
  description: "Gerenciamento do módulo Personal Space",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full space-y-6">
      {children}
    </div>
  );
}
