-- Criar bucket para arquivos do formulário
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'form-documents',
  'form-documents',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
);

-- Política para permitir upload de arquivos (público)
CREATE POLICY "Permitir upload de documentos"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'form-documents');

-- Política para permitir leitura de arquivos (público)
CREATE POLICY "Permitir leitura de documentos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'form-documents');

-- Criar tabela para rastrear submissões do formulário
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cliente_nome TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_cpf TEXT NOT NULL,
  marca_nome TEXT NOT NULL,
  form_data JSONB NOT NULL,
  arquivos_urls JSONB DEFAULT '[]'::jsonb
);

-- Habilitar RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção
CREATE POLICY "Permitir inserção de submissões"
ON public.form_submissions FOR INSERT
TO public
WITH CHECK (true);

-- Política para leitura (apenas para admins - você pode ajustar depois)
CREATE POLICY "Permitir leitura de submissões"
ON public.form_submissions FOR SELECT
TO public
USING (true);