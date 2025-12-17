
/* eslint-disable @next/next/no-img-element */
"use client";

import { RefObject } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PublicProfileDTO } from '../types';
import { Check } from 'lucide-react';

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
    showAvatar?: boolean;
}

// Cores Oficiais
const BRAND = {
    purple: '#42047e',
    green: '#07f49e',
    dark: '#0f0f11',
    white: '#ffffff',
    grayLines: '#e4e4e7', // Cinza muito claro para linhas finas
};

// Componente do Badge de Verificado
const VerifiedBadge = () => (
    <div className="flex items-center justify-center w-8 h-8 ml-2 bg-[#07f49e] rounded-full shrink-0">
        <Check className="w-5 h-5 text-white" strokeWidth={4} />
    </div>
);

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
            ref={innerRef as any}
            // Importante: bg-white forçado e sem sombras para exportação limpa
            className="w-[540px] h-[960px] flex flex-col items-center relative font-sans bg-white box-border"
            style={{ 
                // Garante que não haja transparência
                backgroundColor: '#ffffff', 
            }}
        >
            {/* Faixa Superior Minimalista */}
            <div className="w-full h-3 bg-gradient-to-r from-[#42047e] to-[#07f49e]"></div>

            <div className="flex-1 flex flex-col items-center w-full px-12 pt-12 pb-12">
                
                {/* LOGO */}
                <div className="mb-10 w-full flex justify-center items-center">
                    {safeLogo ? (
                        <div className="flex items-center gap-3">
                            <img 
                                src={safeLogo} 
                                alt="Facillit" 
                                className="h-14 w-auto object-contain"
                                {...(!safeLogo.startsWith('data:') ? { crossOrigin: "anonymous" } : {})}
                            />
                            <span className="text-2xl font-bold tracking-tight text-gray-900">Facillit Hub</span>
                        </div>
                    ) : (
                        <span className="text-4xl font-black tracking-tighter text-[#42047e]">
                            FACILLIT
                        </span>
                    )}
                </div>

                {/* INFO PRINCIPAL */}
                <div className="text-center w-full mb-8">
                    <div className="flex items-center justify-center flex-wrap gap-1 mb-2 px-4">
                        <h1 className="text-[3.5rem] font-[800] leading-none tracking-tight text-gray-900 text-center break-words max-w-full">
                            {profile.name}
                        </h1>
                        {profile.isVerified && <VerifiedBadge />}
                    </div>
                    
                    <p className="text-2xl font-medium text-[#42047e]">
                        @{profile.username}
                    </p>
                </div>

                {/* AVATAR (Design Clean - Sem sombras pesadas) */}
                {showAvatar && (
                    <div className="relative mb-8">
                         {/* Círculo decorativo fino */}
                        <div className="p-1.5 rounded-full border border-dashed border-gray-300">
                            <div className="w-56 h-56 rounded-full overflow-hidden border-[6px] border-white bg-gray-100 relative">
                                {safeAvatar ? (
                                    <img
                                        src={safeAvatar}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                        {...(!safeAvatar.startsWith('data:') ? { crossOrigin: "anonymous" } : {})}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 font-bold text-4xl">
                                        {profile.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Tag Membro */}
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full border border-gray-200 flex items-center gap-2 whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-[#07f49e]"></span>
                            <span className="text-xs font-bold tracking-widest uppercase">
                                Desde {memberSinceYear}
                            </span>
                        </div>
                    </div>
                )}

                {/* BIO */}
                {profile.bio && (
                    <div className="w-full text-center mb-auto px-4 mt-2">
                        <p className="text-xl text-gray-500 leading-relaxed font-medium line-clamp-3">
                            "{profile.bio}"
                        </p>
                    </div>
                )}

                {/* ESTATÍSTICAS (Linhas finas) */}
                <div className="flex w-full justify-center gap-16 py-8 border-t border-b border-gray-100 mb-8 mt-6">
                    <div className="text-center">
                        <span className="block text-[3rem] font-[800] text-gray-900 leading-none mb-2">
                            {stats.followers}
                        </span>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Seguidores</span>
                    </div>
                    <div className="w-px h-auto bg-gray-100"></div>
                    <div className="text-center">
                        <span className="block text-[3rem] font-[800] text-gray-900 leading-none mb-2">
                            {stats.following}
                        </span>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Seguindo</span>
                    </div>
                </div>

                {/* FOOTER / QR CODE */}
                <div className="w-full flex items-center justify-between gap-6">
                     <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Escaneie para acessar
                        </span>
                        <span className="text-xl font-bold text-[#42047e] tracking-tight">
                            facillithub.com
                        </span>
                     </div>
                    
                    <div className="bg-white p-2 border border-gray-200 rounded-xl">
                        <QRCodeSVG 
                            value={profileUrl} 
                            size={80}
                            fgColor="#0f0f11" 
                            bgColor="#ffffff"
                            level={"M"}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};