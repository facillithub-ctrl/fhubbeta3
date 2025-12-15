export type AILevel = "moderate" | "intermediate" | "advanced";
export type AccountType = "student" | "professional" | "enterprise" | "none";

// Interface exata da tabela 'profiles' no Supabase
export interface UserProfile {
  id: string;
  email: string; // Vem de auth.users, mas unificamos aqui no front
  facillit_id: string;
  handle: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  account_type: AccountType;
  
  // JSONB Fields tipados
  address: {
    cep: string;
    street: string;
    city: string;
    state: string;
    number?: string;
  } | null;
  
  active_modules: string[];
  
  ai_level: AILevel;
  
  device_settings: {
    trusted: boolean;
    notifications: boolean;
    twoFactor: boolean;
  };

  created_at: string;
}

// Tipos para as Actions
export interface UpdateProfileDTO {
  full_name?: string;
  handle?: string;
  bio?: string;
  address?: UserProfile['address'];
  avatar_url?: string;
}

export interface UpdateSecurityDTO {
  password?: string;
  email?: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
}