"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { User, Mail, Save, Loader2, Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { updateProfile } from "../actions";
import { supabase } from "@/lib/supabase";

export function ProfileTab({ profile }: { profile: any }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState(profile || {});
  const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obter URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Atualizar estado local para preview imediato
      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      
    } catch (error: any) {
      alert('Erro ao fazer upload da imagem: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    
    startTransition(async () => {
        const result = await updateProfile(profile.id, formData);
        setStatus({ type: result.success ? 'success' : 'error', msg: result.message });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl animate-in fade-in slide-in-from-right-4 space-y-8">
        
        {/* Seção Foto */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-8">
            <div 
                className="relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100"
                onClick={() => fileInputRef.current?.click()}
            >
                {formData.avatar_url ? (
                    <Image src={formData.avatar_url} alt="Avatar" fill className="object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <User className="w-10 h-10" />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                </div>
                {uploading && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-brand-purple" />
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-bold text-gray-900">Sua Foto</h3>
                <p className="text-sm text-gray-500 mb-3">Isso será exibido no seu perfil público.</p>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                />
                <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-brand-purple border border-brand-purple/20 px-3 py-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                >
                    Alterar Foto
                </button>
            </div>
        </div>

        {/* Seção Dados */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4">Dados Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                    <input 
                        type="text" 
                        value={formData.full_name || ""}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Apelido (@)</label>
                    <input 
                        type="text" 
                        value={formData.handle || ""}
                        disabled
                        className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
                    <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="email" 
                            value={formData.email || ""} 
                            disabled
                            className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
                    <textarea 
                        value={formData.bio || ""}
                        onChange={e => setFormData({...formData, bio: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all resize-none"
                        placeholder="Conte um pouco sobre você..."
                    />
                </div>
            </div>
        </div>

        {/* Feedback & Actions */}
        <div className="flex items-center justify-between pt-4">
            <div>
                {status && (
                    <div className={cn(
                        "px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium animate-in fade-in",
                        status.type === 'success' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    )}>
                        {status.type === 'success' ? <CheckCircle2 className="w-4 h-4"/> : <AlertCircle className="w-4 h-4"/>}
                        {status.msg}
                    </div>
                )}
            </div>
            <button 
                type="submit" 
                disabled={isPending}
                className="bg-brand-dark text-white font-bold py-2.5 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-sm disabled:opacity-70"
            >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
                Salvar Alterações
            </button>
        </div>
    </form>
  );
}