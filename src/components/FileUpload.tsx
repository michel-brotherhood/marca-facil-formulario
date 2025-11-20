import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { uploadFile, FileUploadResult } from "@/utils/fileUpload";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
  label: string;
  tipoArquivo: string;
  maxSize?: number;
  acceptedTypes?: string;
  onUploadSuccess: (result: FileUploadResult) => void;
  currentFile?: string;
  showPreview?: boolean;
}

export const FileUpload = ({
  label,
  tipoArquivo,
  maxSize = 5,
  acceptedTypes = "*",
  onUploadSuccess,
  currentFile,
  showPreview = false
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        title: "Arquivo muito grande",
        description: `O arquivo deve ter no máximo ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    // Se for imagem, criar preview
    if (showPreview && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }

    try {
      const result = await uploadFile(file, tipoArquivo);
      
      if (result) {
        toast({
          title: "Upload realizado com sucesso!",
          description: `Arquivo ${result.name} enviado.`,
        });
        onUploadSuccess(result);
      } else {
        toast({
          title: "Erro no upload",
          description: "Não foi possível enviar o arquivo",
          variant: "destructive",
        });
        setPreview(null);
      }
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar o arquivo",
        variant: "destructive",
      });
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={tipoArquivo}>{label}</Label>
      <div className="space-y-3">
        <Input
          id={tipoArquivo}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          disabled={uploading}
          className="cursor-pointer"
        />
        
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Enviando arquivo...</span>
          </div>
        )}
        
        {currentFile && !uploading && (
          <div className="text-sm text-green-600 flex items-center gap-2">
            <span>✓</span>
            <span>Arquivo enviado: {currentFile}</span>
          </div>
        )}
        
        {preview && showPreview && (
          <div className="mt-3">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-xs rounded-lg border shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};
