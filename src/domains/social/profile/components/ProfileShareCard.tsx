"use client";

import { forwardRef, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { UserProfile } from "@/types/account";
import { CheckCircle2 } from "lucide-react";

interface ProfileShareCardProps {
  profile: UserProfile;
  stats?: {
    connections: number;
    views: number;
  };
}

const ProfileShareCard = forwardRef<HTMLDivElement, ProfileShareCardProps>(
  ({ profile, stats }, ref) => {
    const [mounted, setMounted] = useState(false);
    const [profileUrl, setProfileUrl] = useState("https://facillithub.com");

    useEffect(() => {
      setMounted(true);
      if (typeof window !== "undefined") {
        setProfileUrl(window.location.href);
      }
    }, []);

    return (
      <div
        ref={ref}
        className="w-[500px] bg-card border border-border rounded-3xl overflow-hidden shadow-2xl relative flex flex-col font-sans select-none"
      >
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600 relative p-6 flex items-start justify-between">
            <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1">
                <span className="text-white font-bold text-sm tracking-wide">Facillit ID</span>
            </div>
            {/* Logo Watermark */}
            <div className="text-white/10 font-black text-6xl absolute -bottom-6 -right-6 rotate-[-15deg]">
                ID
            </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8 pt-0 flex-1 flex flex-col bg-card relative z-10">
          <div className="flex justify-between items-start -mt-12 mb-6">
             {/* Avatar */}
             <div className="w-24 h-24 rounded-[1.5rem] border-[4px] border-card bg-muted flex items-center justify-center overflow-hidden shadow-lg relative">
                {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.full_name || ""} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-3xl font-bold text-muted-foreground">
                        {(profile.first_name?.[0] || "U")}{(profile.last_name?.[0] || "")}
                    </span>
                )}
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-tl-lg rounded-br-lg p-1">
                    <CheckCircle2 className="w-3 h-3" />
                </div>
             </div>
             
             {/* QR Code */}
             <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 mt-4">
                {mounted ? (
                    <QRCodeSVG 
                        value={profileUrl}
                        size={70}
                        level="M"
                        fgColor="#000000"
                        bgColor="#ffffff"
                    />
                ) : (
                    <div className="w-[70px] h-[70px] bg-gray-100 animate-pulse rounded-lg" />
                )}
             </div>
          </div>

          <div className="space-y-1 mb-6">
            <h2 className="text-2xl font-black text-foreground tracking-tight">
                {profile.first_name} {profile.last_name}
            </h2>
            <p className="text-primary font-bold text-sm">@{profile.handle}</p>
            {profile.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
                    {profile.bio}
                </p>
            )}
          </div>

          {/* Footer Decorativo */}
          <div className="mt-auto pt-6 border-t border-dashed border-border flex justify-between items-center text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
             <span>Facillit Ecosystem</span>
             <span>Verificado</span>
          </div>
        </div>
      </div>
    );
  }
);

ProfileShareCard.displayName = "ProfileShareCard";
export default ProfileShareCard;