    'use server'

    import { createClient } from "@/lib/supabase/server";
    import { OnboardingData, ProfileType } from "@/types/onboarding";
    import { AccountRole } from "@/types/account";
    import { revalidatePath } from "next/cache";
    import { ActionResponse } from "@/lib/errors/types";
    import { logActivity } from "@/lib/audit";

    // --- HELPERS ---

    /**
     * Mapeia o tipo de perfil selecionado para a role do sistema (RBAC).
     * Prioriza a primeira vertical selecionada como a principal para fins de permissão.
     */
    const mapProfileTypeToAccountRole = (type: ProfileType): AccountRole => {
        switch (type) {
            case 'education': return 'student';
            case 'schools': return 'institution';
            case 'enterprise': return 'institution';
            case 'startups': return 'institution';
            case 'individuals': return 'individual';
            default: return 'individual';
        }
    };

    // --- ACTIONS ---

    /**
     * Recupera o facillit_id gerado automaticamente pelo trigger SQL no banco de dados.
     */
    export async function getGeneratedFacillitId(): Promise<string | null> {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('facillit_id')
            .eq('user_id', user.id)
            .single();

        if (error) {
            console.error("[Onboarding] Erro ao buscar facillit_id:", error);
            return null;
        }

        return data.facillit_id;
    }

    /**
     * Finaliza o processo de onboarding, salvando todos os dados de identidade e metadados de IA.
     * Inclui processamento de imagem em base64 para o storage do Supabase.
     */
    export async function completeOnboarding(data: OnboardingData): Promise<ActionResponse> {
    const supabase = await createClient();
    
    // 1. Verifica autenticação do usuário
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { 
            success: false, 
            error: { code: 'AUTH_001', message: "Sessão expirada. Faça login novamente.", category: 'AUTH' } 
        };
    }

    let finalAvatarUrl = data.profileImage;

    // 2. UPLOAD DE IMAGEM (Se for uma nova imagem em base64 vinda do Cropper/Input)
    if (data.profileImage && data.profileImage.startsWith('data:image')) {
        try {
            const fileExt = 'png'; 
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            
            // Converte a string base64 para Buffer
            const base64Data = data.profileImage.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('avatars')
                .upload(fileName, buffer, {
                    contentType: 'image/png',
                    upsert: true
                });

            if (uploadError) {
                console.error("[Onboarding] Falha no upload da foto:", uploadError);
            }

            if (uploadData) {
                const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
                finalAvatarUrl = publicUrl;
            }
        } catch (e) {
            console.error("[Onboarding] Exceção no processamento de imagem:", e);
        }
    }

    // 3. DEFINIÇÃO DE CONTEXTO
    const mainProfile = data.profileTypes[0] || 'individuals';
    const accountRole = mapProfileTypeToAccountRole(mainProfile);

    // 4. PERSISTÊNCIA NO BANCO DE DADOS (Profiles)
    // Utilizamos user_id do Auth como chave de busca para garantir segurança
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            handle: data.handle.toLowerCase().trim(),
            avatar_url: finalAvatarUrl,
            pronouns: data.pronouns,
            gender: data.gender,
            address: data.address, // Persistido como JSONB
            account_type: accountRole,
            onboarding_completed: true,
            ai_level: data.aiLevel === 'advanced' ? 2 : data.aiLevel === 'intermediate' ? 1 : 0,
            ai_preferences: {
                data_sharing: data.permissions.dataAnalysis,
                personalization: data.permissions.recommendations,
                sexuality: data.sexuality || null
            },
            device_settings: {
                trusted: data.deviceTrusted,
                notifications: true
            },
            updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

    if (profileError) {
        console.error("[Onboarding] Erro ao atualizar perfil:", profileError);

        // Tratamento de conflito de handle (Unique Constraint)
        if (profileError.code === '23505') {
            return { 
                success: false, 
                error: { 
                    code: 'ONB_001', 
                    message: "Este @handle já está sendo utilizado.", 
                    category: 'ONBOARDING' 
                } 
            };
        }
        
        return { 
            success: false, 
            error: { 
                code: 'SYS_DB_ERR', 
                message: "Falha de conexão com o banco de dados.", 
                techDescription: profileError.message,
                category: 'DATABASE' 
            } 
        };
    }

    // 5. REGISTRO DE ATIVIDADE (AUDITORIA)
    await logActivity({
        action: 'ONBOARDING_COMPLETE',
        userId: user.id,
        details: { 
            handle: data.handle,
            role: accountRole,
            modules: data.selectedModules,
            ai_level: data.aiLevel,
            id_v: data.facillitId
        }
    });

    revalidatePath('/account');
    return { success: true };
    }

    /**
     * Verifica se um @handle está disponível.
     */
    export async function checkHandleAvailability(handle: string): Promise<{ available: boolean; message?: string }> {
        const cleanHandle = handle.toLowerCase().trim().replace(/[^a-z0-9_]/g, '');
        
        if (cleanHandle.length < 3) {
            return { available: false, message: "Mínimo de 3 caracteres." };
        }
        
        const reserved = ['admin', 'facillit', 'support', 'root', 'api', 'hub', 'system', 'dashboard', 'settings'];
        if (reserved.includes(cleanHandle)) {
            return { available: false, message: "Este nome é reservado." };
        }

        const supabase = await createClient();
        const { data, error } = await supabase
            .from('profiles')
            .select('handle')
            .eq('handle', cleanHandle)
            .maybeSingle();

        if (error) return { available: false, message: "Erro na verificação." };
        if (data) return { available: false, message: "Indisponível." };

        return { available: true };
    }