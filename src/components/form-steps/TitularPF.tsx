import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { cpfMask, cepMask } from "@/utils/masks";
import { validateCEP, validateCPF } from "@/utils/validators";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FileText, GraduationCap, FileCheck, CheckCircle2, XCircle } from "lucide-react";

interface TitularPFProps {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
  clienteData: FormState["cliente"];
}

export const TitularPF = ({ formData, updateFormData, clienteData }: TitularPFProps) => {
  const [cpfValido, setCpfValido] = useState<boolean | null>(null);
  
  const handleCPFValidation = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, "");
    
    if (cleanCPF.length === 0) {
      setCpfValido(null);
      return;
    }
    
    if (cleanCPF.length === 11) {
      const isValid = validateCPF(cpf);
      setCpfValido(isValid);
      
      if (!isValid) {
        toast.error("CPF inválido. Verifique o número digitado.");
      }
    } else {
      setCpfValido(false);
    }
  };
  
  // Autopreencher dados quando escolher "NÃO" em sociedade E representante for "titular"
  useEffect(() => {
    if (formData.possuiSociedade === false && formData.representante === "titular" && clienteData) {
      // Só preenche se os campos estiverem vazios
      if (!formData.nomeCompleto && clienteData.nomeCompleto) {
        updateFormData({
          nomeCompleto: clienteData.nomeCompleto,
          cpf: clienteData.cpf,
          cep: clienteData.cep,
          logradouro: clienteData.logradouro,
          numero: clienteData.numero,
          complemento: clienteData.complemento,
          bairro: clienteData.bairro,
          cidade: clienteData.cidade,
          uf: clienteData.uf,
        });
      }
    }
  }, [formData.possuiSociedade, formData.representante, clienteData, formData.nomeCompleto, updateFormData]);

  // Limpar dados quando escolher "procurador"
  useEffect(() => {
    if (formData.representante === "procurador") {
      updateFormData({
        nomeCompleto: "",
        cpf: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        dataNascimento: "",
        profissao: "",
      });
    }
  }, [formData.representante, updateFormData]);

  const buscarCEP = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, "");
    
    if (!validateCEP(cep)) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      updateFormData({
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf,
      });

      toast.success("Endereço preenchido automaticamente!");
    } catch (error) {
      toast.error("Erro ao buscar CEP. Tente novamente.");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-3 block">
          O titular possui sociedade/participação registrada na Receita Federal com a <strong>mesma atividade</strong> da marca? *
        </Label>
        <RadioGroup
          value={formData.possuiSociedade === null ? "" : formData.possuiSociedade.toString()}
          onValueChange={(value) =>
            updateFormData({ possuiSociedade: value === "true" })
          }
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="true" id="sociedade-sim" />
            <Label htmlFor="sociedade-sim" className="font-normal cursor-pointer flex-1">
              SIM
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="false" id="sociedade-nao" />
            <Label htmlFor="sociedade-nao" className="font-normal cursor-pointer flex-1">
              NÃO
            </Label>
          </div>
        </RadioGroup>
        {formData.possuiSociedade === true && (
          <p className="mt-2 text-sm font-medium text-orange-600">
            ⚠️ Se você é sócio de empresa neste mesmo segmento, escolha a opção Pessoa Jurídica.
          </p>
        )}
      </div>

      {/* Mostrar campos apenas se possuiSociedade for false */}
      {formData.possuiSociedade === false && (
        <>
          <Card className="bg-primary/5 border-l-4 border-primary">
            <CardContent className="pt-4 pb-4">
              <p className="text-sm font-medium">❓ Precisa de Ajuda?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Está em dúvidas sobre como registrar a sua marca ou precisa de ajuda para preencher o formulário?
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

      <div>
        <Label className="mb-3 block">
          O titular da marca é <strong>você mesmo</strong> (TITULAR) ou <strong>procurador</strong>? *
        </Label>
        <RadioGroup
          value={formData.representante}
          onValueChange={(value: "titular" | "procurador") =>
            updateFormData({ representante: value })
          }
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="titular" id="rep-titular" />
            <Label htmlFor="rep-titular" className="font-normal cursor-pointer flex-1">
              TITULAR
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="procurador" id="rep-procurador" />
            <Label htmlFor="rep-procurador" className="font-normal cursor-pointer flex-1">
              PROCURADOR
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="nomeTitular">Nome Completo do Titular *</Label>
        <Input
          id="nomeTitular"
          value={formData.nomeCompleto}
          onChange={(e) => updateFormData({ nomeCompleto: e.target.value })}
          placeholder="Ex: Maria da Silva Santos"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpfTitular">CPF do Titular *</Label>
          <div className="relative">
            <Input
              id="cpfTitular"
              value={formData.cpf}
              onChange={(e) => {
                updateFormData({ cpf: cpfMask(e.target.value) });
                handleCPFValidation(e.target.value);
              }}
              placeholder="000.000.000-00"
              maxLength={14}
              required
              className={
                cpfValido === null
                  ? ""
                  : cpfValido
                  ? "border-green-500 pr-10"
                  : "border-red-500 pr-10"
              }
            />
            {cpfValido !== null && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {cpfValido ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {cpfValido === false && (
            <p className="text-sm text-red-600 mt-1">CPF inválido</p>
          )}
        </div>

        <div>
          <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) => updateFormData({ dataNascimento: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="cepTitular">CEP *</Label>
          <Input
            id="cepTitular"
            value={formData.cep}
            onChange={(e) => updateFormData({ cep: cepMask(e.target.value) })}
            onBlur={(e) => buscarCEP(e.target.value)}
            placeholder="00000-000"
            maxLength={9}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="logradouroTitular">Logradouro *</Label>
          <Input
            id="logradouroTitular"
            value={formData.logradouro}
            onChange={(e) => updateFormData({ logradouro: e.target.value })}
            placeholder="Ex: Rua das Flores, Av. Paulista..."
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="numeroTitular">Número *</Label>
          <Input
            id="numeroTitular"
            value={formData.numero}
            onChange={(e) => updateFormData({ numero: e.target.value })}
            placeholder="Ex: 123, 456-B..."
            required
          />
        </div>

        <div>
          <Label htmlFor="complementoTitular">Complemento</Label>
          <Input
            id="complementoTitular"
            value={formData.complemento}
            onChange={(e) => updateFormData({ complemento: e.target.value })}
            placeholder="Ex: Apto 101, Sala 5..."
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="bairroTitular">Bairro *</Label>
          <Input
            id="bairroTitular"
            value={formData.bairro}
            onChange={(e) => updateFormData({ bairro: e.target.value })}
            placeholder="Ex: Centro, Jardim América..."
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label htmlFor="cidadeTitular">Cidade *</Label>
          <Input
            id="cidadeTitular"
            value={formData.cidade}
            onChange={(e) => updateFormData({ cidade: e.target.value })}
            placeholder="Ex: São Paulo, Rio de Janeiro..."
            required
          />
        </div>

        <div>
          <Label htmlFor="ufTitular">UF *</Label>
          <Input
            id="ufTitular"
            value={formData.uf}
            onChange={(e) => updateFormData({ uf: e.target.value.toUpperCase() })}
            placeholder="SP"
            maxLength={2}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="profissao">Profissão *</Label>
        <Input
          id="profissao"
          value={formData.profissao}
          onChange={(e) => updateFormData({ profissao: e.target.value })}
          placeholder="Ex: Advogado, Engenheiro, Empresário..."
          required
        />
      </div>

      <div>
        <Label htmlFor="rgTitular">Upload do RG do Titular (opcional)</Label>
        <label 
          htmlFor="rgTitular" 
          className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileText className="w-10 h-10 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Clique para fazer upload do RG</p>
          </div>
          <Input
            id="rgTitular"
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
              updateFormData({ rgTitularUrl: file.name });
            }}
            className="hidden"
          />
        </label>
        {formData.rgTitularUrl && (
          <div className="flex items-center justify-between mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">✓ {formData.rgTitularUrl}</p>
            <button
              type="button"
              onClick={() => {
                updateFormData({ rgTitularUrl: "" });
                const input = document.getElementById("rgTitular") as HTMLInputElement;
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

      <div>
        <Label htmlFor="diploma">Upload do Diploma/Prova de Qualificação Profissional (opcional)</Label>
        <label 
          htmlFor="diploma" 
          className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <GraduationCap className="w-10 h-10 mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Clique para fazer upload do diploma</p>
          </div>
          <Input
            id="diploma"
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
              updateFormData({ diplomaUrl: file.name });
            }}
            className="hidden"
          />
        </label>
        {formData.diplomaUrl && (
          <div className="flex items-center justify-between mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">✓ {formData.diplomaUrl}</p>
            <button
              type="button"
              onClick={() => {
                updateFormData({ diplomaUrl: "" });
                const input = document.getElementById("diploma") as HTMLInputElement;
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

      {formData.representante === "procurador" && (
        <div>
          <Label htmlFor="procuracaoPF">Upload da Procuração (opcional)</Label>
          <label 
            htmlFor="procuracaoPF" 
            className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/10 hover:bg-muted/20 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileCheck className="w-10 h-10 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Clique para fazer upload da procuração</p>
            </div>
            <Input
              id="procuracaoPF"
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
                  const input = document.getElementById("procuracaoPF") as HTMLInputElement;
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
