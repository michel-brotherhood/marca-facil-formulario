import { useState } from "react";
import { FormState, initialFormState } from "@/types/formTypes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { ProgressBar } from "@/components/ProgressBar";
import { Etapa1_DadosCliente } from "@/components/form-steps/Etapa1_DadosCliente";
import { Etapa2_DadosTitular } from "@/components/form-steps/Etapa2_DadosTitular";
import { Etapa3_DadosMarca } from "@/components/form-steps/Etapa3_DadosMarca";
import { Etapa4_Confirmacao } from "@/components/form-steps/Etapa4_Confirmacao";
import { Etapa5_Obrigado } from "@/components/form-steps/Etapa5_Obrigado";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { validateCPF, validateEmail, validateCEP, validateCNPJ } from "@/utils/validators";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadFiles } from "@/utils/fileUpload";

const Index = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const updateCliente = (data: Partial<FormState["cliente"]>) => {
    setFormState((prev) => ({
      ...prev,
      cliente: { ...prev.cliente, ...data },
    }));
  };

  const updateTitular = (data: Partial<FormState["titular"]>) => {
    setFormState((prev) => ({
      ...prev,
      titular: { ...prev.titular, ...data },
    }));
  };

  const updateMarca = (data: Partial<FormState["marca"]>) => {
    setFormState((prev) => ({
      ...prev,
      marca: { ...prev.marca, ...data },
    }));
  };

  const updateTermos = (aceita: boolean) => {
    setFormState((prev) => ({
      ...prev,
      termos: { aceitaPolitica: aceita },
    }));
  };

  const highlightInvalidFields = (step: number) => {
    const inputs = document.querySelectorAll(`input, textarea, [role="radiogroup"]`);
    inputs.forEach(input => {
      input.classList.remove('border-red-500', 'ring-red-500');
    });
  };

  const validateStep = (step: number): boolean => {
    highlightInvalidFields(step);
    
    switch (step) {
      case 1: {
        if (!formState.cliente.nomeCompleto) {
          toast.error("Por favor, preencha seu nome completo");
          document.getElementById("nomeCompleto")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.cliente.cpf || !validateCPF(formState.cliente.cpf)) {
          toast.error("Por favor, insira um CPF válido");
          document.getElementById("cpf")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.cliente.email || !validateEmail(formState.cliente.email)) {
          toast.error("Por favor, insira um email válido");
          document.getElementById("email")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.cliente.telefone || formState.cliente.telefone.length < 14) {
          toast.error("Por favor, preencha seu telefone completo");
          document.getElementById("telefone")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.cliente.cep || !validateCEP(formState.cliente.cep)) {
          toast.error("Por favor, insira um CEP válido");
          document.getElementById("cep")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.cliente.logradouro || !formState.cliente.numero || 
            !formState.cliente.bairro || !formState.cliente.cidade || !formState.cliente.uf) {
          toast.error("Por favor, preencha todos os campos do endereço");
          if (!formState.cliente.logradouro) document.getElementById("logradouro")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          if (!formState.cliente.numero) document.getElementById("numero")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          if (!formState.cliente.bairro) document.getElementById("bairro")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          if (!formState.cliente.cidade) document.getElementById("cidade")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          if (!formState.cliente.uf) document.getElementById("uf")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.cliente.preferenciaContato) {
          toast.error("Por favor, selecione sua preferência de contato");
          return false;
        }
        if (!formState.cliente.rgClienteUrl) {
          toast.error("Por favor, faça o upload do seu documento RG");
          return false;
        }
        return true;
      }

      case 2: {
        const titular = formState.titular;

        // Validar seleção de tipo de pessoa
        if (!titular.tipo) {
          toast.error("Selecione se o titular é Pessoa Física ou Pessoa Jurídica");
          return false;
        }

        if (titular.tipo === "pf") {
          // Validar pergunta sobre sociedade
          if (titular.possuiSociedade === null) {
            toast.error("Informe se o titular possui sociedade");
            return false;
          }

          // Se possui sociedade, não pode avançar (deve escolher PJ)
          if (titular.possuiSociedade === true) {
            toast.error("Se você é sócio de empresa neste segmento, escolha a opção Pessoa Jurídica");
            return false;
          }

          // Se não possui sociedade, validar todos os campos
          if (titular.possuiSociedade === false) {
            // Validar seleção de representante
            if (!titular.representante) {
              toast.error("Selecione se você é o titular ou procurador");
              return false;
            }

            if (!titular.nomeCompleto || titular.nomeCompleto.length < 3) {
              toast.error("Nome completo do titular é obrigatório");
              return false;
            }
            if (!validateCPF(titular.cpf)) {
              toast.error("CPF do titular inválido");
              return false;
            }
            if (!titular.dataNascimento) {
              toast.error("Data de nascimento é obrigatória");
              return false;
            }
            if (!validateCEP(titular.cep)) {
              toast.error("CEP do titular inválido");
              return false;
            }
            if (!titular.logradouro || !titular.numero || !titular.bairro || !titular.cidade || !titular.uf) {
              toast.error("Preencha todos os campos de endereço do titular");
              return false;
            }
            if (!titular.profissao) {
              toast.error("Profissão é obrigatória");
              return false;
            }
          }
        } else if (titular.tipo === "pj") {
          if (!validateCNPJ(titular.cnpj)) {
            toast.error("CNPJ inválido");
            return false;
          }
          if (!titular.dadosCnpj) {
            toast.error("Busque os dados do CNPJ antes de continuar");
            return false;
          }
          if (titular.dadosCnpjCorretos === null) {
            toast.error("Confirme se os dados do CNPJ estão corretos");
            return false;
          }
          if (!titular.representante) {
            toast.error("Informe se você é o Responsável Legal");
            return false;
          }
          if (titular.representante === "nao") {
            toast.error("Apenas o Representante Legal ou procurador podem contratar nossos serviços");
            return false;
          }
        }
        return true;
      }

      case 3: {
        if (!formState.marca.nome) {
          toast.error("Nome da marca é obrigatório");
          document.getElementById("nomeMarca")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (!formState.marca.utilizacao) {
          toast.error("Informe para que a marca é utilizada");
          return false;
        }
        if (!formState.marca.atividades || formState.marca.atividades.length < 10) {
          toast.error("Descreva as atividades da marca (mínimo 10 caracteres)");
          document.getElementById("atividades")?.classList.add('border-red-500', 'ring-2', 'ring-red-500');
          return false;
        }
        if (formState.marca.possuiLogo === null) {
          toast.error("Informe se possui logotipo");
          return false;
        }
        if (formState.marca.possuiLogo && !formState.marca.logoUrl) {
          toast.error("Faça o upload do logotipo");
          return false;
        }
        return true;
      }

      case 4: {
        if (!formState.termos.aceitaPolitica) {
          toast.error("Você deve aceitar a política de trabalho para continuar");
          return false;
        }
        return true;
      }

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(formState.currentStep)) {
      setFormState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setFormState((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    try {
      console.log("Iniciando processamento da submissão...");
      toast.loading("Enviando arquivos...");
      
      // Coletar todos os arquivos para upload
      const filesToUpload: { file: File; folder: string }[] = [];
      
      if (formState.cliente.rgClienteFile) {
        filesToUpload.push({ file: formState.cliente.rgClienteFile, folder: 'rg-cliente' });
      }
      if (formState.titular.rgTitularFile) {
        filesToUpload.push({ file: formState.titular.rgTitularFile, folder: 'rg-titular' });
      }
      if (formState.titular.diplomaFile) {
        filesToUpload.push({ file: formState.titular.diplomaFile, folder: 'diploma' });
      }
      if (formState.titular.procuracaoFile) {
        filesToUpload.push({ file: formState.titular.procuracaoFile, folder: 'procuracao' });
      }
      if (formState.marca.logoFile) {
        filesToUpload.push({ file: formState.marca.logoFile, folder: 'logo' });
      }

      console.log(`Fazendo upload de ${filesToUpload.length} arquivo(s)...`);
      
      // Fazer upload de todos os arquivos
      const uploadResults = await uploadFiles(filesToUpload);
      
      console.log(`Upload concluído. ${uploadResults.length} arquivo(s) enviado(s).`);
      
      // Preparar dados para envio com URLs dos arquivos
      const dataToSend = {
        cliente: {
          ...formState.cliente,
          rgClienteFile: undefined, // Remover File object
        },
        titular: {
          ...formState.titular,
          rgTitularFile: undefined,
          diplomaFile: undefined,
          procuracaoFile: undefined,
        },
        marca: {
          ...formState.marca,
          logoFile: undefined,
        },
        arquivos: uploadResults, // Adicionar URLs dos arquivos
      };

      toast.dismiss();
      toast.loading("Enviando solicitação...");

      console.log("Chamando edge function para enviar email...");
      
      // Chamar edge function para enviar email
      const { data, error } = await supabase.functions.invoke('send-form-email', {
        body: dataToSend
      });

      toast.dismiss();

      if (error) {
        console.error("Erro ao enviar email:", error);
        toast.error("Erro ao enviar solicitação. Tente novamente.");
        return;
      }

      console.log("Resposta do envio:", data);
      toast.success("Solicitação enviada com sucesso!");
      setFormState((prev) => ({ ...prev, currentStep: 5 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Erro ao processar solicitação:", error);
      toast.dismiss();
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    }
  };

  const renderStep = () => {
    const stepContent = (() => {
      switch (formState.currentStep) {
        case 1:
          return <Etapa1_DadosCliente formData={formState.cliente} updateFormData={updateCliente} />;
        case 2:
          return <Etapa2_DadosTitular formData={formState.titular} updateFormData={updateTitular} clienteData={formState.cliente} />;
        case 3:
          return <Etapa3_DadosMarca formData={formState.marca} updateFormData={updateMarca} />;
        case 4:
          return <Etapa4_Confirmacao formData={formState} updateTermos={updateTermos} />;
        case 5:
          return <Etapa5_Obrigado />;
        default:
          return null;
      }
    })();

    return (
      <div className="animate-fade-in">
        {stepContent}
      </div>
    );
  };

  if (formState.currentStep === 5) {
    return <Etapa5_Obrigado />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentStep={formState.currentStep} totalSteps={5} />
      <ProgressBar currentStep={formState.currentStep} totalSteps={5} />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 transition-all duration-300">
              <CardContent className="p-4 sm:p-5 md:p-8">
                {renderStep()}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 animate-fade-in">
              {formState.currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="w-full sm:w-auto order-2 sm:order-1 transition-all duration-200 hover:scale-105 text-white border-white hover:bg-white hover:text-primary"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              )}

              {formState.currentStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  className="w-full sm:w-auto order-1 sm:order-2 transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="w-full sm:w-auto order-1 sm:order-2 transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  Finalizar Pedido
                </Button>
              )}
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
