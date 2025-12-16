import { AddressData } from "./onboarding";
import { VerificationTier } from "@/shared/ui/verification-badge"; 

export type AccountTabOption = "overview" | "profile" | "security" | "ai" | "privacy";

export type AccountRole = 'individual' | 'student' | 'teacher' | 'institution' | 'admin';

export interface AIPreferences {
  data_sharing: boolean;
  personalization: boolean;
  autonomy_level: 'moderate' | 'intermediate' | 'advanced';
}

// [NOVO] Interface alinhada com o frontend
export interface ProfilePrivacySettings {
  isPublic: boolean;
  showEmail: boolean;
  showLocation: boolean;
  showEducation: boolean;
  allowMessages: boolean;
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
  
  verification_tier: VerificationTier; 

  address: AddressData | null;
  ai_preferences: AIPreferences | null;
  device_settings: DeviceSettings | null;
  
  account_type: AccountRole;
  onboarding_completed: boolean;
  ai_level: string;
  
  created_at: string;
}

export interface UserIntelligence {
  profile_id: string;
  cognitive_profile: Record<string, unknown>; 
  productive_profile: {
    top_habits?: string[];
    avg_focus_time?: number;
    tasks_completed?: number;
  } | null;
  financial_profile: Record<string, unknown>;
  career_profile: Record<string, unknown>;
}