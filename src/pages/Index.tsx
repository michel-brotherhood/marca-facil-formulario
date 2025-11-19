import { useState } from "react";
import { FormState, initialFormState } from "@/types/formTypes";
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
        const { nomeCompleto, cpf, telefone, email, cep, logradouro, numero, bairro, cidade, uf } =
          formState.cliente;

        if (!nomeCompleto || nomeCompleto.length < 3) {
          toast.error("Nome completo deve ter no mínimo 3 caracteres");
          return false;
        }
        if (!validateCPF(cpf)) {
          toast.error("CPF inválido");
          return false;
        }
        if (!telefone || telefone.length < 14) {
          toast.error("Telefone inválido");
          return false;
        }
        if (!validateEmail(email)) {
          toast.error("E-mail inválido");
          return false;
        }
        if (!validateCEP(cep)) {
          toast.error("CEP inválido");
          return false;
        }
        if (!logradouro || !numero || !bairro || !cidade || !uf) {
          toast.error("Preencha todos os campos de endereço");
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
        const { nome, utilizacao, atividades, possuiLogo, logoUrl } = formState.marca;

        if (!nome) {
          toast.error("Nome da marca é obrigatório");
          return false;
        }
        if (!utilizacao) {
          toast.error("Informe para que a marca é utilizada");
          return false;
        }
        if (!atividades || atividades.length < 10) {
          toast.error("Descreva as atividades da marca (mínimo 10 caracteres)");
          return false;
        }
        if (possuiLogo === null) {
          toast.error("Informe se possui logotipo");
          return false;
        }
        if (possuiLogo && !logoUrl) {
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
        return <Etapa2_DadosTitular formData={formState.titular} updateFormData={updateTitular} />;
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
      <div className="min-h-screen bg-background py-12 px-4">
        <Etapa5_Obrigado />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">MarcaFácil</h1>
          <p className="text-muted-foreground">Registro de Marca Simplificado</p>
        </div>

        <Card>
          <CardContent className="pt-8 pb-6">
            <ProgressBar currentStep={formState.currentStep} totalSteps={5} />

            <div className="mt-8">{renderStep()}</div>

            <div className="flex justify-between mt-8 pt-6 border-t">
              {formState.currentStep > 1 && formState.currentStep < 5 && (
                <Button onClick={prevStep} variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
              )}

              {formState.currentStep < 4 && (
                <Button onClick={nextStep} className="ml-auto gap-2">
                  Próximo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}

              {formState.currentStep === 4 && (
                <Button onClick={handleSubmit} className="ml-auto gap-2">
                  Enviar Solicitação
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
