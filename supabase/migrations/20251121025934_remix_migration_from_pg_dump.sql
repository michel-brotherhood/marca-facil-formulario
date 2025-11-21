--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: arquivos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.arquivos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    formulario_id uuid,
    tipo_arquivo text NOT NULL,
    nome_original text NOT NULL,
    tamanho integer NOT NULL,
    mime_type text NOT NULL,
    storage_path text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.form_submissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    cliente_nome text NOT NULL,
    cliente_email text NOT NULL,
    cliente_cpf text NOT NULL,
    marca_nome text NOT NULL,
    form_data jsonb NOT NULL,
    arquivos_urls jsonb DEFAULT '[]'::jsonb
);


--
-- Name: formularios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.formularios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    etapa_atual integer DEFAULT 1 NOT NULL,
    dados_cliente jsonb,
    dados_titular jsonb,
    dados_marca jsonb,
    termos jsonb,
    status text DEFAULT 'em_andamento'::text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: arquivos arquivos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.arquivos
    ADD CONSTRAINT arquivos_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: formularios formularios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.formularios
    ADD CONSTRAINT formularios_pkey PRIMARY KEY (id);


--
-- Name: formularios update_formularios_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_formularios_updated_at BEFORE UPDATE ON public.formularios FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: arquivos arquivos_formulario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.arquivos
    ADD CONSTRAINT arquivos_formulario_id_fkey FOREIGN KEY (formulario_id) REFERENCES public.formularios(id) ON DELETE CASCADE;


--
-- Name: formularios Permitir atualização pública de formulários; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir atualização pública de formulários" ON public.formularios FOR UPDATE USING (true);


--
-- Name: form_submissions Permitir inserção de submissões; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir inserção de submissões" ON public.form_submissions FOR INSERT WITH CHECK (true);


--
-- Name: arquivos Permitir inserção pública de arquivos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir inserção pública de arquivos" ON public.arquivos FOR INSERT WITH CHECK (true);


--
-- Name: formularios Permitir inserção pública de formulários; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir inserção pública de formulários" ON public.formularios FOR INSERT WITH CHECK (true);


--
-- Name: form_submissions Permitir leitura de submissões; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir leitura de submissões" ON public.form_submissions FOR SELECT USING (true);


--
-- Name: arquivos Permitir leitura pública de arquivos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir leitura pública de arquivos" ON public.arquivos FOR SELECT USING (true);


--
-- Name: formularios Permitir leitura pública de formulários; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Permitir leitura pública de formulários" ON public.formularios FOR SELECT USING (true);


--
-- Name: arquivos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.arquivos ENABLE ROW LEVEL SECURITY;

--
-- Name: form_submissions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

--
-- Name: formularios; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.formularios ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


