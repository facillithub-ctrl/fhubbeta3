import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Hub",
  description: "Gerenciamento do módulo Education Hub",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full space-y-6">
      {children}
    </div>
  );
}
