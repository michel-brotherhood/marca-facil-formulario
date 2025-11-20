import { supabase } from "@/integrations/supabase/client";

export interface FileUploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  fileUrl?: string;
  error?: string;
}

export const uploadFile = async (
  file: File,
  tipoArquivo: string,
  formularioId?: string
): Promise<FileUploadResult> => {
  try {
    console.log('📤 Iniciando upload:', { 
      fileName: file.name, 
      size: file.size, 
      type: file.type,
      tipoArquivo 
    });

    // Validar tamanho do arquivo (5MB para documentos, 2MB para imagens)
    const maxSize = tipoArquivo === "logo" ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      console.error('❌ Arquivo muito grande:', file.size, 'max:', maxSize);
      return {
        success: false,
        error: `Arquivo muito grande. Tamanho máximo: ${maxSize / (1024 * 1024)}MB`
      };
    }

    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${tipoArquivo}/${fileName}`;
    console.log('📁 Caminho do arquivo:', filePath);

    // Upload para o storage
    const { error: uploadError } = await supabase.storage
      .from('formulario-arquivos')
      .upload(filePath, file);

    if (uploadError) {
      console.error("❌ Erro no upload ao storage:", uploadError);
      return { success: false, error: uploadError.message };
    }

    console.log('✅ Upload ao storage bem-sucedido');

    // Obter URL pública do arquivo
    const { data: urlData } = supabase.storage
      .from('formulario-arquivos')
      .getPublicUrl(filePath);
    
    console.log('🔗 URL pública gerada:', urlData.publicUrl);

    // Registrar arquivo no banco de dados
    console.log('💾 Salvando metadados no banco...');
    const { data: arquivoData, error: dbError } = await supabase
      .from('arquivos')
      .insert({
        formulario_id: formularioId || null,
        tipo_arquivo: tipoArquivo,
        nome_original: file.name,
        tamanho: file.size,
        mime_type: file.type,
        storage_path: filePath
      })
      .select()
      .single();

    if (dbError) {
      console.error("❌ Erro ao salvar no banco:", dbError);
      return { success: false, error: dbError.message };
    }

    console.log('✅ Upload completo! ID do arquivo:', arquivoData.id);

    return {
      success: true,
      fileId: arquivoData.id,
      fileName: file.name,
      fileUrl: urlData.publicUrl
    };
  } catch (error: any) {
    console.error("❌ Erro geral no upload:", error);
    return { success: false, error: error.message || 'Erro desconhecido' };
  }
};
