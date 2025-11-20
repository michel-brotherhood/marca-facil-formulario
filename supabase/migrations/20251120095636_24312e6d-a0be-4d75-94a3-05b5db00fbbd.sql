-- Tornar o bucket formulario-arquivos público para permitir acesso às URLs
UPDATE storage.buckets 
SET public = true 
WHERE id = 'formulario-arquivos';