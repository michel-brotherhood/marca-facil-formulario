-- Criar tabela para formulários
CREATE TABLE IF NOT EXISTS public.formularios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  etapa_atual INTEGER NOT NULL DEFAULT 1,
  dados_cliente JSONB,
  dados_titular JSONB,
  dados_marca JSONB,
  termos JSONB,
  status TEXT DEFAULT 'em_andamento',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para arquivos enviados
CREATE TABLE IF NOT EXISTS public.arquivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  formulario_id UUID REFERENCES public.formularios(id) ON DELETE CASCADE,
  tipo_arquivo TEXT NOT NULL,
  nome_original TEXT NOT NULL,
  tamanho INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar buckets de armazenamento
INSERT INTO storage.buckets (id, name, public)
VALUES ('formulario-arquivos', 'formulario-arquivos', false)
ON CONFLICT (id) DO NOTHING;

-- Habilitar RLS
ALTER TABLE public.formularios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arquivos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Permitir inserção pública para formulários
CREATE POLICY "Permitir inserção pública de formulários"
ON public.formularios
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir leitura pública de formulários"
ON public.formularios
FOR SELECT
TO public
USING (true);

CREATE POLICY "Permitir atualização pública de formulários"
ON public.formularios
FOR UPDATE
TO public
USING (true);

-- Políticas RLS para arquivos
CREATE POLICY "Permitir inserção pública de arquivos"
ON public.arquivos
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir leitura pública de arquivos"
ON public.arquivos
FOR SELECT
TO public
USING (true);

-- Políticas de storage
CREATE POLICY "Permitir upload de arquivos"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'formulario-arquivos');

CREATE POLICY "Permitir leitura de arquivos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'formulario-arquivos');

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_formularios_updated_at
BEFORE UPDATE ON public.formularios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();