"use client";

import { UserProfile } from "@/types/account";
import {
  User,
  Lock,
  CreditCard,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { VerificationBadge } from "@/shared/ui/verification-badge";
import { SecureEnvironmentCard } from "@/shared/ui/secure-card";

interface OverviewTabProps {
  user: UserProfile;
  onNavigate: (tab: "profile" | "security" | "ai") => void;
}

export default function OverviewTab({ user, onNavigate }: OverviewTabProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* HERO */}
      <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100">
        <div className="mb-6">
          <div className="w-28 h-28 rounded-full p-1 bg-white border border-gray-200 shadow-sm overflow-hidden mx-auto">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="User"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-3xl font-bold text-gray-400">
                {user.full_name?.charAt(0) ?? "U"}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900">
          Bem-vindo, {user.full_name?.split(" ")[0]}
        </h1>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-gray-500">@{user.handle}</span>
          <VerificationBadge tier={user.verification_tier || "none"} />
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          icon={<Lock className="w-6 h-6" />}
          title="Privacidade & Segurança"
          color="blue"
          onClick={() => onNavigate("security")}
        />

        <Card
          icon={<User className="w-6 h-6" />}
          title="Informações Pessoais"
          color="purple"
          onClick={() => onNavigate("profile")}
        />

        <Card
          icon={<LayoutGrid className="w-6 h-6" />}
          title="Dados & Inteligência"
          color="yellow"
          onClick={() => onNavigate("ai")}
        />

        <Card
          icon={<CreditCard className="w-6 h-6" />}
          title="Assinaturas"
          color="green"
        />
      </div>

      <div className="pt-8 flex justify-center opacity-80">
        <div className="max-w-md w-full">
          <SecureEnvironmentCard />
        </div>
      </div>
    </div>
  );
}

/* ---------- Card Reutilizável ---------- */
interface CardProps {
  icon: React.ReactNode;
  title: string;
  color: "blue" | "purple" | "yellow" | "green";
  onClick?: () => void;
}

function Card({ icon, title, color, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="group p-6 rounded-3xl border bg-white hover:shadow-lg transition-all cursor-pointer"
    >
      <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-2xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <div className="flex items-center text-xs font-bold text-gray-400 group-hover:text-gray-700">
        Acessar <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );
}
