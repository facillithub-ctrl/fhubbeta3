'use client'

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Switch } from "@/shared/ui/switch" // Certifique-se de ter este componente
import { Label } from "@/shared/ui/label"   // Certifique-se de ter este componente
import { Loader2 } from "lucide-react"
import { updatePrivacySettings } from "../actions" // Você precisará criar essa action

export function PrivacyTab({ privacySettings }: { privacySettings: any }) {
  const [isLoading, setIsLoading] = useState(false)
  
  // Estado local simplificado para o exemplo
  const [settings, setSettings] = useState(privacySettings || {
    isPublic: true,
    showEmail: false,
    showLocation: true,
    showEducation: true
  })

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }))
  }

  const onSave = async () => {
    setIsLoading(true)
    try {
      await updatePrivacySettings(settings)
      // Adicionar Toast de sucesso aqui
    } catch (error) {
      // Adicionar Toast de erro
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-medium tracking-tight mb-1">Privacidade do Perfil</h2>
        <p className="text-sm text-gray-500">Controle quem pode ver suas informações e interagir com você.</p>
      </div>

      <div className="space-y-6 border border-gray-100 rounded-xl p-6 bg-gray-50/50">
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Perfil Público</Label>
            <p className="text-sm text-gray-500">Permitir que pessoas encontrem seu perfil via link direto.</p>
          </div>
          <Switch checked={settings.isPublic} onCheckedChange={() => handleToggle('isPublic')} />
        </div>

        <div className="w-full h-px bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Exibir Email</Label>
            <p className="text-sm text-gray-500">Mostrar seu email de contato publicamente.</p>
          </div>
          <Switch checked={settings.showEmail} onCheckedChange={() => handleToggle('showEmail')} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Exibir Localização</Label>
            <p className="text-sm text-gray-500">Mostrar sua cidade/país no card de perfil.</p>
          </div>
          <Switch checked={settings.showLocation} onCheckedChange={() => handleToggle('showLocation')} />
        </div>
        
        <div className="flex items-center justify-between">
            <div className="space-y-0.5">
                <Label>Exibir Educação</Label>
                <p className="text-sm text-gray-500">Mostrar seus certificados e resultados educacionais.</p>
            </div>
            <Switch checked={settings.showEducation} onCheckedChange={() => handleToggle('showEducation')} />
        </div>

      </div>

      <div className="flex justify-end">
        <Button onClick={onSave} disabled={isLoading} className="bg-brand-primary min-w-[120px]">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Salvar Alterações
        </Button>
      </div>
    </div>
  )
}