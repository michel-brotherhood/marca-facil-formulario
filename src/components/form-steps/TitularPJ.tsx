import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { cnpjMask } from "@/utils/masks";
import { validateCNPJ } from "@/utils/validators";
import { toast } from "sonner";

interface TitularPJProps {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
}

export const TitularPJ = ({ formData, updateFormData }: TitularPJProps) => {
  const buscarCNPJ = async (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    
    if (!validateCNPJ(cnpj)) {
      toast.error("CNPJ inválido.");
      return;
    }

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
      
      if (!response.ok) {
        toast.error("CNPJ não encontrado.");
        return;
      }

      const data = await response.json();

      updateFormData({
        dadosCnpj: {
          razaoSocial: data.razao_social || data.nome_fantasia || "",
          nomeFantasia: data.nome_fantasia || "",
          cnae: data.cnae_fiscal_descricao || "",
          situacao: data.descricao_situacao_cadastral || "",
        },
      });

      toast.success("Dados do CNPJ carregados!");
    } catch (error) {
      toast.error("Erro ao buscar CNPJ. Tente novamente.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cnpj">CNPJ *</Label>
        <Input
          id="cnpj"
          value={formData.cnpj}
          onChange={(e) => updateFormData({ cnpj: cnpjMask(e.target.value) })}
          onBlur={(e) => buscarCNPJ(e.target.value)}
          placeholder="00.000.000/0000-00"
          maxLength={18}
          required
        />
      </div>

      {formData.dadosCnpj && (
        <>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-lg">Dados da Receita Federal</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Razão Social</p>
                  <p className="font-medium">{formData.dadosCnpj.razaoSocial}</p>
                </div>
                {formData.dadosCnpj.nomeFantasia && (
                  <div>
                    <p className="text-sm text-muted-foreground">Nome Fantasia</p>
                    <p className="font-medium">{formData.dadosCnpj.nomeFantasia}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">CNAE Principal</p>
                  <p className="font-medium">{formData.dadosCnpj.cnae}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Situação Cadastral</p>
                  <p className="font-medium">{formData.dadosCnpj.situacao}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <Label className="mb-3 block">Os dados acima estão corretos? *</Label>
            <RadioGroup
              value={
                formData.dadosCnpjCorretos === null
                  ? ""
                  : formData.dadosCnpjCorretos.toString()
              }
              onValueChange={(value) =>
                updateFormData({ dadosCnpjCorretos: value === "true" })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="dados-corretos-sim" />
                <Label htmlFor="dados-corretos-sim" className="font-normal cursor-pointer">
                  Sim, estão corretos
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="dados-corretos-nao" />
                <Label htmlFor="dados-corretos-nao" className="font-normal cursor-pointer">
                  Não, há divergências
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-3 block">
              Você é o Responsável Legal deste CNPJ? *
            </Label>
            <RadioGroup
              value={formData.representante}
              onValueChange={(value: "sim" | "nao" | "procurador") =>
                updateFormData({ representante: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="responsavel-sim" />
                <Label htmlFor="responsavel-sim" className="font-normal cursor-pointer">
                  Sim, sou o responsável legal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="responsavel-nao" />
                <Label htmlFor="responsavel-nao" className="font-normal cursor-pointer">
                  Não
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="procurador" id="responsavel-procurador" />
                <Label htmlFor="responsavel-procurador" className="font-normal cursor-pointer">
                  Sou procurador
                </Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
};
