"use client";

import { useState, useRef } from "react";
import { User, Camera, Loader2, Save, Check, AlertCircle, Globe } from "lucide-react";
import { UserProfile } from "@/types/account";
import { updateProfile } from "../actions";
import { cn } from "@/shared/utils/cn";

interface Props {
    user: UserProfile;
}

export default function ProfileTab({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(user.avatar_url);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    handle: user.handle || "",
    bio: user.bio || "",
    gender: user.gender || "",
    pronouns: user.pronouns || ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
        const res = await updateProfile({
            ...formData,
            avatar_url: imagePreview
        });

        if (res.success) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } else {
            setErrorMsg(res.error || "Erro ao salvar.");
        }
    } catch (error) {
        setErrorMsg("Erro inesperado.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
                <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                    Configuração de Perfil Público
                </h2>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500 bg-gray-50 w-fit px-2 py-1 rounded-md border border-gray-100">
                    <Globe className="w-3 h-3 text-gray-400"/>
                    <span>Informações visíveis no ecossistema Facillit.</span>
                </div>
            </div>
            
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className={cn(
                    "flex items-center justify-center gap-2 px-6 py-3 text-white text-xs font-bold rounded-xl transition-all shadow-lg",
                    success ? "bg-green-600 hover:bg-green-700" : "bg-brand-dark hover:bg-black",
                    "disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                )}
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin"/> : success ? <Check className="w-4 h-4"/> : <Save className="w-4 h-4"/>}
                {success ? "Salvo!" : "Salvar Alterações"}
            </button>
        </div>

        {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100 flex items-center gap-2 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
        )}

        <div className="flex flex-col md:flex-row gap-10">
            
            {/* Coluna 1: Avatar */}
            <div className="flex flex-col items-center gap-4 shrink-0">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-36 h-36 rounded-full border-4 border-white shadow-xl shadow-gray-200/50 cursor-pointer relative overflow-hidden group transition-all hover:scale-105"
                >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                    {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                            <User className="w-16 h-16" />
                        </div>
                    )}
                </div>
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-brand-purple hover:text-brand-dark transition-colors"
                >
                    Alterar foto
                </button>
            </div>

            {/* Coluna 2: Formulário */}
            <div className="flex-1 space-y-6">
                
                {/* Nome e Sobrenome (Campo Único ou Dividido conforme sua lógica, aqui mantive Nome Completo) */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome de Exibição</label>
                    <input 
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-brand-purple/10 focus:border-brand-purple transition-all placeholder:text-gray-300"
                        placeholder="Como você quer ser chamado?"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">@Handle Único</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">@</span>
                            <input 
                                value={formData.handle}
                                onChange={e => setFormData({...formData, handle: e.target.value})}
                                className="w-full pl-8 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-brand-purple/10 focus:border-brand-purple transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pronomes</label>
                        <input 
                            value={formData.pronouns}
                            onChange={e => setFormData({...formData, pronouns: e.target.value})}
                            placeholder="Ex: Ele/Dele"
                            className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-brand-purple/10 focus:border-brand-purple transition-all placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bio (Resumo)</label>
                    <textarea 
                        rows={4}
                        value={formData.bio}
                        onChange={e => setFormData({...formData, bio: e.target.value})}
                        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-brand-purple/10 focus:border-brand-purple transition-all resize-none placeholder:text-gray-300"
                        placeholder="Escreva um pouco sobre sua carreira, estudos ou objetivos..."
                    />
                    <p className="text-[10px] text-gray-400 text-right">{formData.bio.length}/160 caracteres</p>
                </div>

                {/* Email Readonly */}
                <div className="pt-4 border-t border-gray-100">
                    <div className="space-y-1.5 opacity-70">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail de Login</label>
                        <input 
                            value={user.email}
                            disabled
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed"
                        />
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400">
                            <AlertCircle className="w-3 h-3"/> 
                            <span>Para alterar o e-mail principal, entre em contato com o suporte.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}