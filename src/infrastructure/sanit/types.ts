export type SanitContentType = 
  | 'BLOG_POST' 
  | 'LEGAL_TERM' 
  | 'HELP_ARTICLE' 
  | 'SYSTEM_UPDATE';

export type LegalCategory = 
  | 'TERMS_OF_USE' 
  | 'PRIVACY_POLICY' 
  | 'COOKIES' 
  | 'SUBSCRIPTION' 
  | 'DATA_PROCESSING';

export interface SanitContentItem {
  id: string;
  slug: string;
  title: string;
  description?: string;
  body?: string; // HTML Puro
  coverImage?: string;
  type: SanitContentType;
  legalCategory?: LegalCategory;
  
  // Metadados Jurídicos
  region?: string;
  language?: string;
  version?: string;
  effectiveDate?: string; // ISO Date

  updatedAt: string;
  author?: string;
}