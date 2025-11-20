import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { cnpjMask } from "@/utils/masks";
import { validateCNPJ } from "@/utils/validators";
import { toast } from "sonner";
import { FileCheck } from "lucide-react";

interface TitularPJProps {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
}

export const TitularPJ = ({ formData, updateFormData }: TitularPJProps) => {
  const buscarCNPJ = async (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    
    if (!validateCNPJ(cnpj)) {
      return;
    }

    toast.loading("Buscando dados do CNPJ...");

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
      
      toast.dismiss();
      
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

      toast.success("Dados do CNPJ carregados automaticamente!");
    } catch (error) {
      toast.dismiss();
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
          placeholder=""
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
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="true" id="dados-corretos-sim" />
                <Label htmlFor="dados-corretos-sim" className="font-normal cursor-pointer">
                  SIM
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="false" id="dados-corretos-nao" />
                <Label htmlFor="dados-corretos-nao" className="font-normal cursor-pointer">
                  NÃO
                </Label>
              </div>
            </RadioGroup>
            <Card className="mt-3 bg-primary/5 border-l-4 border-primary">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm font-medium">❓ Precisa de Ajuda?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Precisa de ajuda com os dados ou tem dúvidas sobre o processo?
                </p>
                <a
                  href="https://calendly.com/admin-marcafacil/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  ☕ Agendar Videoconferência Gratuita (30 min)
                </a>
              </CardContent>
            </Card>
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
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="sim" id="responsavel-sim" />
                <Label htmlFor="responsavel-sim" className="font-normal cursor-pointer">
                  SIM
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="nao" id="responsavel-nao" />
                <Label htmlFor="responsavel-nao" className="font-normal cursor-pointer">
                  NÃO
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <RadioGroupItem value="procurador" id="responsavel-procurador" />
                <Label htmlFor="responsavel-procurador" className="font-normal cursor-pointer">
                  PROCURADOR
                </Label>
              </div>
            </RadioGroup>
            <p className="mt-2 text-sm font-medium text-orange-600">
              ⚠️ Apenas o Representante Legal ou procurador devidamente constituído do Titular podem contratar nossos serviços.
            </p>
          </div>

          {formData.representante === "procurador" && (
            <div>
              <Label htmlFor="procuracaoPJ">Upload da Procuração (opcional)</Label>
              <label 
                htmlFor="procuracaoPJ" 
                className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileCheck className="w-10 h-10 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Clique para fazer upload da procuração</p>
                </div>
                <Input
                  id="procuracaoPJ"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("O arquivo deve ter no máximo 5MB");
                      e.target.value = "";
                      return;
                    }
                    
                    toast.success(`Arquivo ${file.name} selecionado`);
                    updateFormData({ procuracaoUrl: file.name });
                  }}
                  className="hidden"
                />
              </label>
              {formData.procuracaoUrl && (
                <div className="flex items-center justify-between mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">✓ {formData.procuracaoUrl}</p>
                  <button
                    type="button"
                    onClick={() => {
                      updateFormData({ procuracaoUrl: "" });
                      const input = document.getElementById("procuracaoPJ") as HTMLInputElement;
                      if (input) input.value = "";
                      toast.success("Arquivo removido");
                    }}
                    className="text-red-600 hover:text-red-700 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
