"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { updateProfile } from "./actions";
import { UserProfile } from "@/types/account";
import { 
  User, Shield, Activity, CreditCard, Smartphone, 
  Settings, Loader2, Camera, Save, CheckCircle2, AlertCircle, Mail, Sparkles
} from "lucide-react"; // Settings importado aqui!
import { cn } from "@/shared/utils/cn";

// --- COMPONENTES INTERNOS ---

// 1. Visão Geral
const OverviewTab = ({ profile }: { profile: UserProfile }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-200 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-gray-100 overflow-hidden relative">
                {profile?.avatar_url ? (
                    <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-purple text-white text-2xl font-bold">
                        {profile?.full_name?.[0] || "U"}
                    </div>
                )}
            </div>
            <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h2>
                <p className="text-gray-500 text-sm mt-1">@{profile?.handle} • {profile?.account_type}</p>
            </div>
        </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold text-sm"><Shield className="w-4 h-4"/> Segurança</div>
            <p className="text-sm text-gray-500">{profile?.device_settings?.twoFactor ? "Alta" : "Média"}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold text-sm"><Activity className="w-4 h-4"/> Atividade</div>
            <p className="text-sm text-gray-500">{profile?.active_modules?.length || 0} Apps Ativos</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-gray-900 font-bold text-sm"><CreditCard className="w-4 h-4"/> Plano</div>
            <p className="text-sm text-brand-purple font-bold">Free Tier</p>
        </div>
    </div>
  </div>
);

// 2. Editar Perfil (Com Upload)
const ProfileTab = ({ profile, refresh }: { profile: UserProfile, refresh: () => void }) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState(profile);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
        setUploading(true);
        const file = e.target.files?.[0];
        if (!file) return;

        const fileName = `${profile.id}-${Date.now()}`;
        const { error } = await supabase.storage.from('avatars').upload(fileName, file);
        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
        await updateProfile(profile.id, { avatar_url: publicUrl });
        refresh();
    } catch (err) {
        alert("Erro no upload");
    } finally {
        setUploading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
        await updateProfile(profile.id, { 
            full_name: formData.full_name, 
            bio: formData.bio 
        });
        refresh();
    });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-right-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-6">
            <div className="relative group w-20 h-20 rounded-full overflow-hidden bg-gray-100 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {formData.avatar_url ? (
                    <Image src={formData.avatar_url} alt="Avatar" fill className="object-cover" />
                ) : (
                    <User className="w-8 h-8 m-auto text-gray-400"/>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                </div>
                {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-brand-purple"/></div>}
            </div>
            <div>
                <h3 className="font-bold text-gray-900">Foto de Perfil</h3>
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-brand-purple font-medium hover:underline">Alterar foto</button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
            </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="grid gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Nome Completo</label>
                <input 
                    type="text" 
                    value={formData.full_name || ""} 
                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Bio</label>
                <textarea 
                    value={formData.bio || ""} 
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-purple/20 outline-none resize-none"
                />
            </div>
        </div>

        <div className="flex justify-end">
            <button disabled={isPending} className="bg-brand-dark text-white font-bold py-2.5 px-6 rounded-lg shadow-sm flex items-center gap-2 text-sm">
                {isPending ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
                Salvar
            </button>
        </div>
    </form>
  );
};

// --- CONTROLLER PRINCIPAL ---

export default function AccountPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        if (data) setProfile({ ...data, email: user.email });
    }
    setLoading(false);
  };

  useEffect(() => { fetchProfile(); }, []);

  if (loading) return <div className="h-[50vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-300" /></div>;
  if (!profile) return null;

  return (
    <div className="space-y-8 pb-20">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {activeTab === 'overview' && "Visão Geral"}
            {activeTab === 'profile' && "Meu Perfil"}
            {activeTab === 'security' && "Segurança"}
            {activeTab === 'billing' && "Assinatura"}
            {activeTab === 'ai' && "Inteligência Artificial"}
        </h1>
        <p className="text-gray-500 mt-1">Gerencie suas informações do Facillit ID.</p>
      </div>

      {activeTab === "overview" && <OverviewTab profile={profile} />}
      {activeTab === "profile" && <ProfileTab profile={profile} refresh={fetchProfile} />}
      
      {/* Placeholders para outras abas */}
      {["security", "billing", "ai"].includes(activeTab) && (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Settings className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Em Desenvolvimento</h3>
            <p className="text-gray-500 mt-1">Esta funcionalidade estará disponível na próxima atualização.</p>
        </div>
      )}
    </div>
  );
}