import { useRef } from "react";
import Image from "next/image";
import { Camera, UserCircle, Check, ArrowRight } from "lucide-react"; // Imports OK

export default function StepIdentity({ data, update, onNext }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update("profileImage", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
    update("handle", val);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Sua Identidade</h1>
        <p className="text-gray-500 text-lg">Como você será reconhecido no ecossistema.</p>
      </div>

      <div className="flex flex-col items-center py-4 flex-1 justify-center">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-48 h-48 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-gray-50 flex items-center justify-center relative ring-1 ring-gray-200">
                {data.profileImage ? (
                    <Image src={data.profileImage} alt="Profile" fill className="object-cover" />
                ) : (
                    <UserCircle className="w-24 h-24 text-gray-300" />
                )}
            </div>
            
            {/* Botão Flutuante de Upload */}
            <button className="absolute bottom-2 right-2 w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-4 border-white">
                <Camera className="w-5 h-5" />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
        <p className="text-sm text-gray-400 mt-4 font-medium">Toque para adicionar foto</p>
      </div>

      <div className="space-y-6 max-w-lg mx-auto w-full">
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Seu @apelido único</label>
            <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl group-focus-within:text-brand-purple transition-colors">@</span>
                <input 
                    type="text" 
                    value={data.handle}
                    onChange={handleHandleChange}
                    placeholder="usuario.unico" 
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all" 
                    autoFocus
                />
                {data.handle.length > 3 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-green flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold">
                        <Check className="w-3 h-3"/> Livre
                    </div>
                )}
            </div>
            <p className="text-xs text-gray-400 mt-2 ml-1">
                Link público: facillit.hub/<span className="text-brand-purple font-bold">@{data.handle || "..."}</span>
            </p>
        </div>
      </div>

      <div className="flex justify-end pt-8 mt-auto">
        <button 
            onClick={onNext} 
            disabled={!data.handle}
            className="bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-10 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
        >
            Continuar <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}