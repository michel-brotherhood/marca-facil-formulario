-- Criar bucket para documentos do formulário
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'form-documents',
  'form-documents', 
  true,
  5242880,
  ARRAY[
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf'
  ]
);

-- Política para permitir upload público
CREATE POLICY "Permitir upload público"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'form-documents');

-- Política para permitir visualização pública
CREATE POLICY "Permitir visualização pública"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'form-documents');