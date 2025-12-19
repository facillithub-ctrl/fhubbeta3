import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schools Management",
  description: "Gerenciamento do módulo Schools Management",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full space-y-6">
      {children}
    </div>
  );
}
