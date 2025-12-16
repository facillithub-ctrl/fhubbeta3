import { AddressData } from "./onboarding";

// Tipo para as Abas de Navegação (Compartilhado)
export type AccountTabOption = "overview" | "profile" | "security" | "ai";

export type AccountRole = 'individual' | 'student' | 'teacher' | 'institution' | 'admin';

// Helper para JSONB seguro
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface AIPreferences {
  data_sharing: boolean;
  personalization: boolean;
  autonomy_level: 'moderate' | 'intermediate' | 'advanced';
}

export interface PrivacySettings {
  allow_ads: boolean;
  share_data: boolean;
  public_profile: boolean;
}

export interface DeviceSettings {
  trusted: boolean;
  notifications: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  facillit_id: string | null;
  handle: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  birth_date: string | null;
  gender: string | null;
  pronouns: string | null;
  
  // JSONBs tipados corretamente
  address: AddressData | null;
  ai_preferences: AIPreferences;
  privacy_settings: PrivacySettings;
  device_settings: DeviceSettings;
  
  account_type: AccountRole;
  onboarding_completed: boolean;
  ai_level: string;
  
  created_at: string;
}

export interface UserIntelligence {
  profile_id: string;
  // Usamos 'unknown' ou estrutura específica em vez de 'any'
  cognitive_profile: Record<string, unknown>; 
  productive_profile: {
    top_habits?: string[];
    avg_focus_time?: number;
    tasks_completed?: number;
  };
  financial_profile: Record<string, unknown>;
  career_profile: Record<string, unknown>;
}