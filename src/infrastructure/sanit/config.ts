// src/infrastructure/sanit/config.ts

// A palavra 'export' é OBRIGATÓRIA aqui
export const sanitConfig = {
  // URL onde o projeto SANIT está rodando
  apiUrl: process.env.SANIT_API_URL || 'http://localhost:3000', 
  
  // Chave definida no .env
  apiKey: process.env.SANIT_API_SECRET,
};