import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise Solutions",
  description: "Gerenciamento do módulo Enterprise Solutions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full space-y-6">
      {children}
    </div>
  );
}
