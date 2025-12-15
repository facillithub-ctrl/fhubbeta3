"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Briefcase, Building2, Rocket, Heart } from "lucide-react";
import { cn } from "@/shared/utils/cn";

const hubs = [
  { id: "education", title: "Education", desc: "Meus estudos", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50", border: "hover:border-purple-200" },
  { id: "schools", title: "Schools", desc: "Gestão escolar", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50", border: "hover:border-indigo-200" },
  { id: "startups", title: "Startups", desc: "Tecnologia", icon: Rocket, color: "text-pink-600", bg: "bg-pink-50", border: "hover:border-pink-200" },
  { id: "enterprise", title: "Enterprise", desc: "Corporativo", icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-200" },
  { id: "individuals", title: "Individuals", desc: "Pessoal", icon: Heart, color: "text-orange-600", bg: "bg-orange-50", border: "hover:border-orange-200" },
];

export default function SelectHubPage() {
  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-700">
      
      <div className="text-center mb-12">
        <div className="relative w-16 h-16 mx-auto mb-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <Image src="/assets/images/accont.svg" alt="ID" fill className="object-contain" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Escolha seu Hub</h1>
        <p className="text-gray-500 text-lg">Onde você quer focar agora?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {hubs.map((hub) => (
            <Link 
                key={hub.id} 
                href={`/dashboard/${hub.id}`}
                className={cn(
                    "flex flex-col items-center p-8 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1",
                    hub.border
                )}
            >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", hub.bg)}>
                    <hub.icon className={cn("w-8 h-8", hub.color)} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{hub.title}</h3>
                <p className="text-sm text-gray-400 font-medium">{hub.desc}</p>
            </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/account" className="text-sm font-bold text-gray-400 hover:text-brand-purple transition-colors">
            Gerenciar meu Facillit ID
        </Link>
      </div>

    </div>
  );
}