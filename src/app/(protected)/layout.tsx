"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// CORREÇÃO: Importar da nova estrutura
import { createClient } from "@/lib/supabase/client";
import { Sidebar } from "@/shared/ui/sidebar";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // CORREÇÃO: Instanciar o cliente
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-gray-50/30">
        {children}
      </main>
    </div>
  );
}