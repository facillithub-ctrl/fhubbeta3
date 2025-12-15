"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/shared/ui/sidebar"; // Importa o arquivo criado acima
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] font-sans text-gray-900">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-[260px] p-6 md:p-12 transition-all duration-300">
        <div className="max-w-5xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}