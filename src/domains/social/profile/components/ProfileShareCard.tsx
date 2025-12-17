/* eslint-disable @next/next/no-img-element */
"use client";

import { RefObject } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PublicProfileDTO } from '../types';
import { VerificationTier } from '@/shared/ui/verification-badge';

export interface ShareCardStats {
    followers: number;
    following: number;
}

interface ProfileShareCardProps {
    profile: PublicProfileDTO;
    stats: ShareCardStats;
    innerRef: RefObject<HTMLDivElement | null>;
    avatarOverride?: string | null;
    logoOverride?: string | null;
    isExporting?: boolean;
}

const BADGE_COLORS: Record<string, string> = {
    verified: "#3b82f6",     
    professional: "#10b981", 
    creator: "#eab308",      
    official: "#ef4444",     
};

const BadgeIcon = ({ tier }: { tier: VerificationTier }) => {
    if (!tier || tier === 'none') return null;
    const color = BADGE_COLORS[tier] || BADGE_COLORS.verified;
    
    return (
        <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 ml-1.5 mt-1.5 shrink-0" 
            style={{ minWidth: '24px' }}
        >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74Z" fill={color} fillOpacity="0.1" />
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="m9 12 2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export const ProfileShareCard = ({ 
    profile, 
    stats, 
    innerRef, 
    avatarOverride, 
    logoOverride, 
    isExporting = false,
}: ProfileShareCardProps) => {
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://facillithub.com';
    const profileUrl = `${baseUrl}/u/${profile.username}`;
    const safeAvatar = avatarOverride || (isExporting ? null : profile.avatarUrl);
    const safeLogo = logoOverride || (isExporting ? null : "/assets/images/accont.svg");
    const memberSinceYear = profile.createdAt ? new Date(profile.createdAt).getFullYear() : new Date().getFullYear();

    return (
        <div
            ref={innerRef as any}
            className="w-[540px] h-[960px] flex flex-col items-center relative font-sans bg-white box-border"
            style={{ backgroundColor: '#ffffff' }}
        >
            {/* Barra Gradient no topo */}
            <div className="w-full h-3 bg-gradient-to-r from-[#42047e] to-[#07f49e]"></div>

            <div className="flex-1 flex flex-col items-center w-full px-12 pt-16 pb-12">
                
                {/* [CORREÇÃO] Logo MUITO MAIOR (h-40 = 160px) */}
                <div className="mb-10 mt-2 h-40 flex items-center justify-center">
                    {safeLogo ? (
                        <img 
                            src={safeLogo} 
                            alt="Facillit" 
                            className="h-full w-auto object-contain"
                            {...(!safeLogo.startsWith('data:') ? { crossOrigin: "anonymous" } : {})}
                        />
                    ) : null}
                </div>

                {/* AVATAR */}
                <div className="relative mb-8">
                    <div className="p-1.5 rounded-full border border-gray-100">
                        <div className="w-52 h-52 rounded-full overflow-hidden bg-gray-50 relative border-4 border-white shadow-sm">
                            {safeAvatar ? (
                                <img
                                    src={safeAvatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                    {...(!safeAvatar.startsWith('data:') ? { crossOrigin: "anonymous" } : {})}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-gray-300">
                                    {profile.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* NOME E VERIFICAÇÃO */}
                <div className="text-center w-full mb-3">
                    <div className="flex items-start justify-center w-full gap-0.5">
                        <h1 className="text-[2.8rem] font-bold text-gray-900 leading-none tracking-tight break-words max-w-[85%]">
                            {profile.name}
                        </h1>
                        <BadgeIcon tier={profile.verificationTier} />
                    </div>
                    
                    <p className="text-xl font-medium text-gray-400 mt-2">
                        @{profile.username}
                    </p>
                </div>

                {/* BIO */}
                {profile.bio && (
                    <div className="w-full text-center px-6 mt-4 mb-auto">
                        <p className="text-lg text-gray-500 font-medium leading-relaxed line-clamp-3 italic">
                            {profile.bio}
                        </p>
                    </div>
                )}

                {!profile.bio && <div className="mb-auto"></div>}

                {/* ESTATÍSTICAS */}
                <div className="flex w-full justify-center gap-14 py-8 border-t border-gray-100 mb-8 w-[85%]">
                    <div className="text-center">
                        <span className="block text-[2.5rem] font-bold text-gray-900 leading-none mb-1">
                            {stats.followers}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seguidores</span>
                    </div>
                    <div className="w-px h-auto bg-gray-100"></div>
                    <div className="text-center">
                        <span className="block text-[2.5rem] font-bold text-gray-900 leading-none mb-1">
                            {stats.following}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seguindo</span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="w-full bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                            Escaneie para acessar
                        </span>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            facillithub.com
                        </span>
                    </div>
                    <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
                        <QRCodeSVG 
                            value={profileUrl} 
                            size={56}
                            fgColor="#111827" 
                            bgColor="#ffffff"
                            level={"M"}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};