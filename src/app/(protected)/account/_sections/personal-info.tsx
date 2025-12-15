"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, ChevronRight, Loader2, User, Save, X } from "lucide-react";
import { UserProfile } from "@/types/account";
import { updateProfileData } from "../actions";
import { supabase } from "@/lib/supabase";
import { cn } from "@/shared/utils/cn";

// Sub-componente de Linha Editável
const InfoRow = ({ label, value, field, onSave, multiline = false }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(field, tempValue);
    setSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-6 -mx-6">
      <div className="w-1/3 min-w-[150px]">
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      
      <div className="flex-1 mr-4">
        {isEditing ? (
          multiline ? (
            <textarea 
                value={tempValue || ""} 
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                rows={3}
            />
          ) : (
            <input 
                type="text" 
                value={tempValue || ""} 
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          )
        ) : (
          <span className="text-base text-gray-900 font-medium break-words">{value || "Não informado"}</span>
        )}
      </div>

      <div className="w-10 flex justify-end">
        {isEditing ? (
            <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="p-2 text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
                <button onClick={handleSave} disabled={saving} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5"/>}
                </button>
            </div>
        ) : (
            <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <ChevronRight className="w-5 h-5" />
            </button>
        )}
      </div>
    </div>
  );
};

export function PersonalInfo({ profile, refresh }: { profile: UserProfile, refresh: () => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpdate = async (field: string, value: string) => {
    await updateProfileData(profile.id, { [field]: value });
    refresh(); // Recarrega dados
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileName = `${profile.id}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
      await updateProfileData(profile.id, { avatar_url: publicUrl });
      refresh();
    } catch (error) {
      alert("Erro no upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl font-normal text-gray-900">Informações Pessoais</h2>
        <p className="text-gray-500">Informações básicas, como seu nome e foto, que você usa nos serviços Facillit.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
            <h3 className="text-base font-medium text-gray-900">Perfil Básico</h3>
            <p className="text-xs text-gray-500">Algumas informações podem ser visíveis para outras pessoas.</p>
        </div>

        <div className="p-6">
            {/* Foto Row Custom */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                <span className="text-sm font-medium text-gray-500 w-1/3">Foto</span>
                <div className="flex-1 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                        {profile.avatar_url ? (
                            <Image src={profile.avatar_url} alt="Avatar" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400"><User className="w-8 h-8"/></div>
                        )}
                        {uploading && <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><Loader2 className="w-6 h-6 text-white animate-spin"/></div>}
                    </div>
                    <span className="text-xs text-gray-400 group-hover:text-blue-600">Toque para alterar</span>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <InfoRow label="Nome" value={profile.full_name} field="full_name" onSave={handleUpdate} />
            <InfoRow label="Apelido (@)" value={profile.handle} field="handle" onSave={handleUpdate} />
            <InfoRow label="Bio" value={profile.bio} field="bio" onSave={handleUpdate} multiline />
            
            {/* Campos Read Only */}
            <div className="flex items-center justify-between py-6 px-6 -mx-6">
                <span className="text-sm font-medium text-gray-500 w-1/3">ID Facillit</span>
                <span className="flex-1 text-base text-gray-400 font-mono">{profile.facillit_id}</span>
                <div className="w-10"></div>
            </div>
        </div>
      </div>
    </div>
  );
}