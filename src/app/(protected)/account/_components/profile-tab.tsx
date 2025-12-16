"use client";

import { useState, useRef } from "react";
import { User, Camera, Loader2, Save, Check, AlertCircle } from "lucide-react";
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
            avatar_url: imagePreview // Nota: Em prod usar upload de storage real
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
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
                <h2 className="text-lg font-bold text-gray-900">Dados Pessoais</h2>
                <p className="text-xs text-gray-500 mt-1">Informações visíveis no seu perfil público.</p>
            </div>
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className={cn(
                    "flex items-center gap-2 px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all shadow-lg",
                    success ? "bg-green-600 hover:bg-green-700" : "bg-brand-dark hover:bg-black",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin"/> : success ? <Check className="w-3 h-3"/> : <Save className="w-3 h-3"/>}
                {success ? "Salvo com sucesso!" : "Salvar Alterações"}
            </button>
        </div>

        {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
        )}

        <div className="flex flex-col md:flex-row gap-8">
            
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-32 rounded-full border-2 border-dashed border-gray-200 hover:border-brand-purple cursor-pointer relative overflow-hidden group transition-all"
                >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                    </div>
                    {imagePreview ? (
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                            <User className="w-12 h-12" />
                        </div>
                    )}
                </div>
                <p className="text-[10px] text-gray-400 font-bold cursor-pointer hover:text-brand-purple" onClick={() => fileInputRef.current?.click()}>
                    Alterar foto
                </p>
            </div>

            {/* Campos */}
            <div className="flex-1 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input 
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300"
                        placeholder="Seu nome"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">@Handle</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">@</span>
                            <input 
                                value={formData.handle}
                                onChange={e => setFormData({...formData, handle: e.target.value})}
                                className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300"
                                placeholder="usuario"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Pronomes</label>
                        <input 
                            value={formData.pronouns}
                            onChange={e => setFormData({...formData, pronouns: e.target.value})}
                            placeholder="Ele/Dele, Ela/Dela"
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all placeholder:text-gray-300"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Bio</label>
                    <textarea 
                        rows={3}
                        value={formData.bio}
                        onChange={e => setFormData({...formData, bio: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all resize-none placeholder:text-gray-300"
                        placeholder="Conte um pouco sobre você..."
                    />
                </div>

                <div className="space-y-1.5 opacity-70">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail (Login)</label>
                    <input 
                        value={user.email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}