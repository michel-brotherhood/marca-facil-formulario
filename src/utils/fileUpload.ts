import { supabase } from "@/integrations/supabase/client";

export interface FileUploadResult {
  url: string;
  path: string;
  name: string;
}

/**
 * Faz upload de um arquivo para o Supabase Storage
 * @param file - Arquivo a ser enviado
 * @param folder - Pasta dentro do bucket (ex: "rg", "diploma", "logo")
 * @returns Informações do arquivo enviado ou null em caso de erro
 */
export const uploadFile = async (
  file: File,
  folder: string
): Promise<FileUploadResult | null> => {
  try {
    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${randomString}.${fileExtension}`;
    const filePath = `${folder}/${fileName}`;

    console.log(`📤 Iniciando upload: ${file.name} -> ${filePath}`);

    // Fazer upload
    const { data, error } = await supabase.storage
      .from('form-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('❌ Erro no upload:', error);
      return null;
    }

    console.log('✅ Upload concluído:', data);

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('form-documents')
      .getPublicUrl(filePath);

    console.log('🔗 URL pública:', publicUrl);

    return {
      url: publicUrl,
      path: filePath,
      name: file.name
    };
  } catch (error) {
    console.error('❌ Exceção durante upload:', error);
    return null;
  }
};

/**
 * Faz upload de múltiplos arquivos
 */
export const uploadFiles = async (
  files: { file: File; folder: string }[]
): Promise<FileUploadResult[]> => {
  const uploadPromises = files.map(({ file, folder }) => 
    uploadFile(file, folder)
  );
  
  const results = await Promise.all(uploadPromises);
  
  // Filtrar resultados nulos
  return results.filter((result): result is FileUploadResult => result !== null);
};
