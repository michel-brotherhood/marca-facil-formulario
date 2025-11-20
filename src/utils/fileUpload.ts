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
    // Validar tamanho do arquivo (5MB para documentos, 2MB para imagens)
    const maxSize = tipoArquivo === "logo" ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: `Arquivo muito grande. Tamanho máximo: ${maxSize / (1024 * 1024)}MB`
      };
    }

    // Gerar nome único para o arquivo
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${tipoArquivo}/${fileName}`;

    // Upload para o storage
    const { error: uploadError } = await supabase.storage
      .from('formulario-arquivos')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Erro no upload:", uploadError);
      return { success: false, error: uploadError.message };
    }

    // Obter URL pública do arquivo
    const { data: urlData } = supabase.storage
      .from('formulario-arquivos')
      .getPublicUrl(filePath);

    // Registrar arquivo no banco de dados
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
      console.error("Erro ao salvar no banco:", dbError);
      return { success: false, error: dbError.message };
    }

    return {
      success: true,
      fileId: arquivoData.id,
      fileName: file.name,
      fileUrl: urlData.publicUrl
    };
  } catch (error: any) {
    console.error("Erro no upload:", error);
    return { success: false, error: error.message };
  }
};
