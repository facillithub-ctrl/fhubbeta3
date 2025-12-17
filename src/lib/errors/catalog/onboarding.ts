import { AppError } from "../types";

export const ONBOARDING_ERRORS = {
  HANDLE_ALREADY_EXISTS: {
    code: 'ONB_001',
    message: 'Este @usuário já está em uso. Por favor, escolha outro.',
    techDescription: 'Violação de constraint unique na coluna "handle" da tabela profiles.',
    category: 'ONBOARDING',
    httpStatus: 409
  } as AppError,

  IMAGE_UPLOAD_FAILED: {
    code: 'ONB_002',
    message: 'Não conseguimos salvar sua foto. Tente uma imagem menor (max 5MB).',
    techDescription: 'Erro no supabase.storage.upload. Possível timeout ou size limit.',
    category: 'SYSTEM',
    action: { label: 'Ajuda com Imagens', url: '/help/images' }
  } as AppError,

  PROFILE_UPDATE_FAILED: {
    code: 'ONB_003',
    message: 'Ocorreu um erro ao salvar seu perfil. Tente novamente.',
    techDescription: 'Erro genérico no update da tabela profiles.',
    category: 'DATABASE'
  } as AppError,

  MISSING_DATA: {
    code: 'ONB_004',
    message: 'Alguns dados obrigatórios estão faltando. Revise o formulário.',
    techDescription: 'Payload incompleto recebido na server action.',
    category: 'VALIDATION'
  } as AppError,
};