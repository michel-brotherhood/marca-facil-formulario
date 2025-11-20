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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: {
        if (!formState.cliente.nomeCompleto) {
          toast.error("Por favor, preencha seu nome completo");
          return false;
        }
        if (!formState.cliente.cpf || !validateCPF(formState.cliente.cpf)) {
          toast.error("Por favor, insira um CPF válido");
          return false;
        }
        if (!formState.cliente.email || !validateEmail(formState.cliente.email)) {
          toast.error("Por favor, insira um email válido");
          return false;
        }
        if (!formState.cliente.telefone || formState.cliente.telefone.length < 14) {
          toast.error("Por favor, preencha seu telefone completo");
          return false;
        }
        if (!formState.cliente.cep || !validateCEP(formState.cliente.cep)) {
          toast.error("Por favor, insira um CEP válido");
          return false;
        }
        if (!formState.cliente.logradouro || !formState.cliente.numero || 
            !formState.cliente.bairro || !formState.cliente.cidade || !formState.cliente.uf) {
          toast.error("Por favor, preencha todos os campos do endereço");
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

        if (titular.tipo === "pf") {
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
          if (titular.possuiSociedade === null) {
            toast.error("Informe se o titular possui sociedade");
            return false;
          }
        } else {
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
        }
        return true;
      }

      case 3: {
        if (!formState.marca.nome) {
          toast.error("Nome da marca é obrigatório");
          return false;
        }
        if (!formState.marca.utilizacao) {
          toast.error("Informe para que a marca é utilizada");
          return false;
        }
        if (!formState.marca.atividades || formState.marca.atividades.length < 10) {
          toast.error("Descreva as atividades da marca (mínimo 10 caracteres)");
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
      // Aqui você enviaria os dados para o backend
      console.log("Dados do formulário:", formState);
      
      toast.success("Solicitação enviada com sucesso!");
      setFormState((prev) => ({ ...prev, currentStep: 5 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    }
  };

  const renderStep = () => {
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
  };

  if (formState.currentStep === 5) {
    return (
      <div className="min-h-screen bg-background">
        <Header currentStep={5} totalSteps={5} />
        <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <Etapa5_Obrigado />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentStep={formState.currentStep} totalSteps={5} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardContent className="p-4 sm:p-6 md:p-8">
                {renderStep()}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 md:mt-8">
              {formState.currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="w-full sm:w-auto order-2 sm:order-1"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              )}

              {formState.currentStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  className="w-full sm:w-auto order-1 sm:order-2"
                  size="lg"
                >
                  Próximo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="w-full sm:w-auto order-1 sm:order-2"
                  size="lg"
                >
                  Finalizar Pedido
                </Button>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
