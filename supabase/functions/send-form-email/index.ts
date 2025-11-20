import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormData {
  cliente: {
    nomeCompleto: string;
    cpf: string;
    telefone: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    preferenciaContato: string;
    rgClienteUrl: string;
  };
  titular: {
    tipo: string;
    possuiSociedade: boolean | null;
    representante: string;
    nomeCompleto: string;
    cpf: string;
    dataNascimento: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    profissao: string;
    cnpj: string;
    dadosCnpjCorretos: boolean | null;
    dadosCnpj?: {
      razaoSocial: string;
      nomeFantasia: string;
      cnae: string;
      situacao: string;
      porte: string;
      naturezaJuridica: string;
    };
  };
  marca: {
    nome: string;
    utilizacao: string;
    atividades: string;
    possuiLogo: boolean | null;
    logoUrl: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Recebendo dados do formulário...");
    const formData: FormData = await req.json();
    
    console.log("Dados recebidos:", {
      cliente: formData.cliente.nomeCompleto,
      titular: formData.titular.tipo,
      marca: formData.marca.nome
    });

    // Construir email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .section { background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
            .section h2 { color: #667eea; margin-top: 0; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; margin-left: 10px; }
            .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">📋 Nova Solicitação de Registro de Marca</h1>
              <p style="margin: 10px 0 0 0;">Data: ${new Date().toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>

            <div class="section">
              <h2>👤 Dados do Cliente</h2>
              <div class="field"><span class="label">Nome:</span><span class="value">${formData.cliente.nomeCompleto}</span></div>
              <div class="field"><span class="label">CPF:</span><span class="value">${formData.cliente.cpf}</span></div>
              <div class="field"><span class="label">E-mail:</span><span class="value">${formData.cliente.email}</span></div>
              <div class="field"><span class="label">Telefone:</span><span class="value">${formData.cliente.telefone}</span></div>
              <div class="field"><span class="label">Endereço:</span><span class="value">${formData.cliente.logradouro}, ${formData.cliente.numero}${formData.cliente.complemento ? ' - ' + formData.cliente.complemento : ''} - ${formData.cliente.bairro}, ${formData.cliente.cidade}/${formData.cliente.uf} - CEP: ${formData.cliente.cep}</span></div>
              <div class="field"><span class="label">Preferência de Contato:</span><span class="value">${formData.cliente.preferenciaContato === 'whatsapp' ? 'WhatsApp' : 'E-mail'}</span></div>
              ${formData.cliente.rgClienteUrl ? `<div class="field"><span class="label">RG:</span><span class="value">✓ Arquivo anexado: ${formData.cliente.rgClienteUrl}</span></div>` : ''}
            </div>

            <div class="section">
              <h2>🏢 Dados do Titular da Marca</h2>
              <div class="field"><span class="label">Tipo:</span><span class="value">${formData.titular.tipo === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}</span></div>
              
              ${formData.titular.tipo === 'pf' ? `
                <div class="field"><span class="label">Nome:</span><span class="value">${formData.titular.nomeCompleto}</span></div>
                <div class="field"><span class="label">CPF:</span><span class="value">${formData.titular.cpf}</span></div>
                <div class="field"><span class="label">Data de Nascimento:</span><span class="value">${formData.titular.dataNascimento}</span></div>
                <div class="field"><span class="label">Profissão:</span><span class="value">${formData.titular.profissao}</span></div>
                <div class="field"><span class="label">Possui Sociedade:</span><span class="value">${formData.titular.possuiSociedade ? 'Sim' : 'Não'}</span></div>
                <div class="field"><span class="label">Representante:</span><span class="value">${formData.titular.representante === 'titular' ? 'Titular' : 'Procurador'}</span></div>
                <div class="field"><span class="label">Endereço:</span><span class="value">${formData.titular.logradouro}, ${formData.titular.numero}${formData.titular.complemento ? ' - ' + formData.titular.complemento : ''} - ${formData.titular.bairro}, ${formData.titular.cidade}/${formData.titular.uf} - CEP: ${formData.titular.cep}</span></div>
              ` : `
                <div class="field"><span class="label">CNPJ:</span><span class="value">${formData.titular.cnpj}</span></div>
                ${formData.titular.dadosCnpj ? `
                  <div class="field"><span class="label">Razão Social:</span><span class="value">${formData.titular.dadosCnpj.razaoSocial}</span></div>
                  ${formData.titular.dadosCnpj.nomeFantasia ? `<div class="field"><span class="label">Nome Fantasia:</span><span class="value">${formData.titular.dadosCnpj.nomeFantasia}</span></div>` : ''}
                  <div class="field"><span class="label">Porte:</span><span class="value">${formData.titular.dadosCnpj.porte}</span></div>
                  <div class="field"><span class="label">Natureza Jurídica:</span><span class="value">${formData.titular.dadosCnpj.naturezaJuridica}</span></div>
                  <div class="field"><span class="label">CNAE:</span><span class="value">${formData.titular.dadosCnpj.cnae}</span></div>
                ` : ''}
                <div class="field"><span class="label">Responsável Legal:</span><span class="value">${formData.titular.representante === 'sim' ? 'Sim' : formData.titular.representante === 'procurador' ? 'Procurador' : 'Não'}</span></div>
              `}
            </div>

            <div class="section">
              <h2>🎨 Dados da Marca</h2>
              <div class="field"><span class="label">Nome da Marca:</span><span class="value"><strong>${formData.marca.nome}</strong></span></div>
              <div class="field"><span class="label">Utilização:</span><span class="value">${
                formData.marca.utilizacao === 'produtos' ? 'Produtos' :
                formData.marca.utilizacao === 'servicos' ? 'Serviços' : 'Outros'
              }</span></div>
              <div class="field"><span class="label">Atividades:</span><span class="value">${formData.marca.atividades}</span></div>
              <div class="field"><span class="label">Possui Logo:</span><span class="value">${formData.marca.possuiLogo ? 'Sim' : 'Não'}</span></div>
              ${formData.marca.logoUrl ? `<div class="field"><span class="label">Logo:</span><span class="value">✓ Arquivo anexado: ${formData.marca.logoUrl}</span></div>` : ''}
            </div>

            <div class="footer">
              <p>Este é um email automático gerado pelo sistema de registro de marcas.</p>
              <p>Marca Fácil - Registro de Marcas</p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log("Enviando email para atendimento@marcafacil.legal...");

    const emailResponse = await resend.emails.send({
      from: "Marca Fácil <onboarding@resend.dev>",
      to: ["atendimento@marcafacil.legal"],
      subject: `📋 Nova Solicitação - ${formData.marca.nome} - ${formData.cliente.nomeCompleto}`,
      html: emailHtml,
      replyTo: formData.cliente.email,
    });

    console.log("Email enviado com sucesso:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email enviado com sucesso",
        emailId: emailResponse.data?.id 
      }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar email:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json", 
        ...corsHeaders 
      },
    });
  }
};

serve(handler);