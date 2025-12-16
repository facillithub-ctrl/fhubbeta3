/* eslint-disable @next/next/no-img-element */
"use client";

import { RefObject } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PublicProfileDTO } from '../types';

export interface ShareCardStats {
    followers: number;
    following: number;
}

export type CardTheme = 'light';

interface ProfileShareCardProps {
    profile: PublicProfileDTO;
    stats: ShareCardStats;
    // [CORREÇÃO] Permitir null no RefObject para compatibilidade com useRef(null)
    innerRef: RefObject<HTMLDivElement | null>; 
    avatarOverride?: string | null;
    logoOverride?: string | null;
    isExporting?: boolean;
    theme?: CardTheme;
    showAvatar?: boolean;
}

const BRAND = {
    purple: '#42047e',
    green: '#07f49e',
    dark: '#0f0f11',
    light: '#ffffff',
    gray: '#f4f4f5',
    gradient: 'linear-gradient(135deg, #42047e 0%, #07f49e 100%)'
};

export const ProfileShareCard = ({ 
    profile, 
    stats, 
    innerRef, 
    avatarOverride, 
    logoOverride, 
    isExporting = false,
    showAvatar = true
}: ProfileShareCardProps) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://facillithub.com';
    const profileUrl = `${baseUrl}/u/${profile.username}`;

    const safeAvatar = avatarOverride || (isExporting ? null : profile.avatarUrl);
    const safeLogo = logoOverride || (isExporting ? null : "/assets/images/accont.svg");

    const memberSinceYear = profile.createdAt 
        ? new Date(profile.createdAt).getFullYear() 
        : new Date().getFullYear();

    return (
        <div
            // O cast 'as any' garante que o React aceite a ref mesmo com tipos estritos
            ref={innerRef as any}
            className="w-[540px] h-[960px] flex flex-col items-center relative overflow-hidden font-sans box-border bg-white"
        >
            <div className="w-full h-5" style={{ background: BRAND.gradient }}></div>

            <div className="flex-1 flex flex-col items-center w-full px-10 pt-10 pb-10">
                
                <div className="mb-8 w-full flex justify-center">
                    {safeLogo ? (
                        <img 
                            src={safeLogo} 
                            alt="Facillit" 
                            className="h-20 object-contain"
                            {...(!safeLogo.startsWith('data:') ? { crossOrigin: "anonymous" } : {})}
                        />
                    ) : (
                        <span className="text-4xl font-black tracking-tighter" style={{ color: BRAND.purple }}>
                            FACILLIT
                        </span>
                    )}
                </div>

                <div className="mb-4 px-6 py-2 rounded-full border border-gray-100 bg-gray-50/50">
                    <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-gray-400">
                        Perfil Oficial
                    </span>
                </div>

                <div className="text-center w-full mb-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <h1 className="text-[3.8rem] font-[900] leading-[0.95] tracking-tight text-[#0f0f11]">
                            {profile.name}
                        </h1>
                    </div>
                    
                    <p className="text-3xl font-bold" style={{ color: BRAND.purple }}>
                        @{profile.username}
                    </p>
                </div>

                {showAvatar && (
                    <div className="relative mb-8">
                        <div className="p-2 rounded-[50px] bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                            <div className="rounded-[42px] overflow-hidden w-60 h-60 relative border-4 border-white bg-gray-100">
                                {safeAvatar ? (
                                    <img
                                        src={safeAvatar}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                        {...(!safeAvatar.startsWith('data:') ? { crossOrigin: "anonymous" } : {})}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                        <div className='w-24 h-24 bg-gray-300 rounded-full' />
                                    </div>
                                )}
                            </div>
                            
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-[#0f0f11] px-5 py-2.5 rounded-full border border-gray-200 shadow-lg flex items-center gap-2 whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                <span className="text-xs font-bold tracking-widest uppercase">
                                    Membro desde {memberSinceYear}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {profile.bio && (
                    <div className="w-full text-center mb-8 px-6 mt-4">
                        <p className="text-xl font-medium text-gray-500 leading-snug line-clamp-2">
                            {profile.bio}
                        </p>
                    </div>
                )}

                <div className="flex w-full justify-center gap-14 mb-auto border-t border-gray-100 pt-8 mt-2">
                    <div className="text-center">
                        <span className="block text-[2.8rem] font-[900] text-[#0f0f11] leading-none mb-1">
                            {stats.followers}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Seguidores</span>
                    </div>
                    <div className="w-px h-16 bg-gray-100"></div>
                    <div className="text-center">
                        <span className="block text-[2.8rem] font-[900] text-[#0f0f11] leading-none mb-1">
                            {stats.following}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Seguindo</span>
                    </div>
                </div>

                <div className="w-full mt-8 bg-[#f8f9fa] rounded-3xl p-3 flex items-center justify-between border border-gray-200/60 shadow-sm">
                    <div className="flex items-center gap-5 pl-5">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: BRAND.gradient }}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                <polyline points="10 17 15 12 10 7" />
                                <line x1="15" y1="12" x2="3" y2="12" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#42047e]">
                                ACESSE AGORA
                            </span>
                            <span className="text-2xl font-bold text-[#0f0f11] tracking-tight">
                                facillithub.com
                            </span>
                        </div>
                    </div>
                    
                    <div className="bg-white p-2 rounded-2xl border border-gray-100">
                        <QRCodeSVG 
                            value={profileUrl} 
                            size={70}
                            fgColor="#000000" 
                            bgColor="#ffffff"
                            level={"M"}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};