import { sanitConfig } from './config';
import { SanitContentItem } from './types';

class SanitClient {
  private async fetch<T>(path: string, tags: string[] = []): Promise<T | null> {
    try {
      const res = await fetch(`${sanitConfig.apiUrl}/api/v1/public/content${path}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sanitConfig.apiKey}`,
          'Content-Type': 'application/json',
        },
        next: { 
          revalidate: 3600, // Cache de 1 hora por padrão
          tags: ['sanit-content', ...tags] 
        } 
      });

      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error(`[SANIT_ERROR] Falha ao buscar ${path}`, error);
      return null;
    }
  }

  // Busca documento único pelo Slug
  async getBySlug(slug: string) {
    return this.fetch<SanitContentItem>(`?slug=${slug}`, [`doc-${slug}`]);
  }

  // Busca lista filtrada (ex: listar todos os termos legais para o menu)
  async getLegalMenu() {
    // Retorna apenas campos leves para montar o menu
    return this.fetch<{ data: SanitContentItem[] }>(`?type=LEGAL_TERM&limit=20`, ['legal-menu']);
  }
}

export const sanitClient = new SanitClient();