"use client";

import { useState, useRef } from "react";
import { User, Camera, Loader2, Save } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export default function ProfileTab() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock Data (Substituir por dados reais do Supabase/Context)
  const [formData, setFormData] = useState({
    firstName: "Usuário",
    lastName: "Demo",
    email: "usuario@facillit.com",
    handle: "usuariodemo",
    bio: ""
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Dados Pessoais</h2>
                <p className="text-xs text-gray-500 mt-1">Gerencie sua identidade pública.</p>
            </div>
            <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white text-xs font-bold rounded-lg hover:bg-black transition-all disabled:opacity-50"
            >
                {loading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Save className="w-3 h-3"/>}
                Salvar
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            
            {/* Coluna Imagem */}
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
                <span className="text-[10px] font-bold text-brand-purple cursor-pointer hover:underline" onClick={() => fileInputRef.current?.click()}>
                    Alterar foto
                </span>
            </div>

            {/* Coluna Form */}
            <div className="flex-1 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome</label>
                        <input 
                            value={formData.firstName}
                            onChange={e => setFormData({...formData, firstName: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sobrenome</label>
                        <input 
                            value={formData.lastName}
                            onChange={e => setFormData({...formData, lastName: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email (Não editável)</label>
                    <input 
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">@Handle</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">@</span>
                        <input 
                            value={formData.handle}
                            onChange={e => setFormData({...formData, handle: e.target.value})}
                            className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-brand-purple focus:border-brand-purple transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}