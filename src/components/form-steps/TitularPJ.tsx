import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { cnpjMask } from "@/utils/masks";
import { validateCNPJ } from "@/utils/validators";
import { toast } from "sonner";
import { FileCheck, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

interface TitularPJProps {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
}

export const TitularPJ = ({ formData, updateFormData }: TitularPJProps) => {
  const [cnpjValido, setCnpjValido] = useState<boolean | null>(null);
  const handleCNPJValidation = (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    
    if (cleanCNPJ.length === 0) {
      setCnpjValido(null);
      return;
    }
    
    if (cleanCNPJ.length === 14) {
      const isValid = validateCNPJ(cnpj);
      setCnpjValido(isValid);
      
      if (!isValid) {
        toast.error("CNPJ inválido. Verifique o número digitado.");
      }
    } else {
      setCnpjValido(false);
    }
  };

  const buscarCNPJ = async (cnpj: string) => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    
    if (!validateCNPJ(cnpj)) {
      setCnpjValido(false);
      toast.error("CNPJ inválido. Verifique o número digitado.");
      return;
    }
    
    setCnpjValido(true);

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
          porte: data.porte || "",
          naturezaJuridica: data.natureza_juridica || "",
          logradouro: data.logradouro || "",
          numero: data.numero || "",
          complemento: data.complemento || "",
          bairro: data.bairro || "",
          municipio: data.municipio || "",
          uf: data.uf || "",
          cep: data.cep || "",
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
        <div className="relative">
          <Input
            id="cnpj"
            value={formData.cnpj}
            onChange={(e) => {
              updateFormData({ cnpj: cnpjMask(e.target.value) });
              handleCNPJValidation(e.target.value);
            }}
            onBlur={(e) => buscarCNPJ(e.target.value)}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            required
            className={
              cnpjValido === null
                ? ""
                : cnpjValido
                ? "border-green-500 pr-10"
                : "border-red-500 pr-10"
            }
          />
          {cnpjValido !== null && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {cnpjValido ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>
        {cnpjValido === false && (
          <p className="text-sm text-red-600 mt-1">CNPJ inválido</p>
        )}
      </div>

      {formData.dadosCnpj && (
        <>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2 mb-4">
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-green-800">Dados da Receita Federal</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-green-800">Razão Social:</p>
                  <p className="font-medium text-green-900">{formData.dadosCnpj.razaoSocial}</p>
                </div>
                {formData.dadosCnpj.nomeFantasia && (
                  <div>
                    <p className="text-sm font-semibold text-green-800">Nome Fantasia:</p>
                    <p className="font-medium text-green-900">{formData.dadosCnpj.nomeFantasia}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-green-800">Porte:</p>
                  <p className="font-medium text-green-900">{formData.dadosCnpj.porte}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Natureza Jurídica:</p>
                  <p className="font-medium text-green-900">{formData.dadosCnpj.naturezaJuridica}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Endereço:</p>
                  <p className="font-medium text-green-900">
                    {[
                      formData.dadosCnpj.logradouro && `${formData.dadosCnpj.logradouro}${formData.dadosCnpj.numero ? ', ' + formData.dadosCnpj.numero : ''}`,
                      formData.dadosCnpj.complemento,
                      formData.dadosCnpj.bairro,
                      formData.dadosCnpj.municipio && formData.dadosCnpj.uf ? `${formData.dadosCnpj.municipio}/${formData.dadosCnpj.uf}` : formData.dadosCnpj.municipio || formData.dadosCnpj.uf,
                      formData.dadosCnpj.cep && `CEP: ${formData.dadosCnpj.cep}`
                    ].filter(Boolean).join(' - ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">CNAE Principal:</p>
                  <p className="font-medium text-green-900">{formData.dadosCnpj.cnae}</p>
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
                <Label htmlFor="dados-corretos-sim" className="font-normal cursor-pointer flex-1">
                  SIM
                </Label>
              </div>
              <div className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors ${
                formData.dadosCnpjCorretos === false ? 'border-2 border-primary' : 'border'
              }`}>
                <RadioGroupItem value="false" id="dados-corretos-nao" />
                <Label htmlFor="dados-corretos-nao" className="font-normal cursor-pointer flex-1">
                  NÃO
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.dadosCnpjCorretos === false && (
            <Card className="bg-red-50 border-red-200 border-l-4 border-l-red-500">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-2">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm font-semibold text-red-800">Precisa de ajuda com os dados?</p>
                    <p className="text-sm text-red-700 mt-1">
                      Entre em contato conosco via{" "}
                      <a 
                        href="https://wa.me/5521999999999" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        WhatsApp
                      </a>
                      {" "}ou{" "}
                      <a
                        href="https://calendly.com/admin-marcafacil/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        agende uma videoconferência gratuita
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {formData.dadosCnpjCorretos === true && (
            <>
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
                    <Label htmlFor="responsavel-sim" className="font-normal cursor-pointer flex-1">
                      SIM
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <RadioGroupItem value="nao" id="responsavel-nao" />
                    <Label htmlFor="responsavel-nao" className="font-normal cursor-pointer flex-1">
                      NÃO
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <RadioGroupItem value="procurador" id="responsavel-procurador" />
                    <Label htmlFor="responsavel-procurador" className="font-normal cursor-pointer flex-1">
                      PROCURADOR
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.representante === "nao" && (
                <p className="text-sm font-medium text-orange-600">
                  ⚠️ Apenas o Representante Legal ou procurador devidamente constituído do Titular podem contratar nossos serviços.
                </p>
              )}
            </>
          )}

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
