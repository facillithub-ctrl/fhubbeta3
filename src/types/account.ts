export type AILevel = "moderate" | "intermediate" | "advanced";
export type AccountType = "student" | "professional" | "enterprise" | "none";

// Interface do Perfil no Banco de Dados
export interface UserProfile {
  id: string;
  email: string;
  facillit_id: string;
  handle: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  account_type: AccountType;
  
  // Configurações JSONB
  active_modules: string[];
  ai_level: AILevel;
  device_settings: {
    trusted: boolean;
    notifications: boolean;
    twoFactor: boolean;
  };
  
  created_at: string;
}

// Tipos para Atualização
export interface UpdateProfileDTO {
  full_name?: string;
  handle?: string;
  bio?: string;
  avatar_url?: string;
  ai_level?: AILevel;
  device_settings?: UserProfile['device_settings'];
}

export interface ActionResult {
  success: boolean;
  message: string;
}