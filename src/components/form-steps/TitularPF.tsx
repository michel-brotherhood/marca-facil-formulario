import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cpfMask, cnpjMask, cepMask } from "@/utils/masks";
import { validateCEP } from "@/utils/validators";
import { FileUpload } from "@/components/FileUpload";
import { toast } from "sonner";

interface TitularPFProps {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
}

export const TitularPF = ({ formData, updateFormData }: TitularPFProps) => {
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
            <Label htmlFor="sociedade-sim" className="font-normal cursor-pointer">
              SIM
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="false" id="sociedade-nao" />
            <Label htmlFor="sociedade-nao" className="font-normal cursor-pointer">
              NÃO
            </Label>
          </div>
        </RadioGroup>
        <p className="mt-2 text-sm font-medium text-orange-600">
          ⚠️ Se você é sócio de empresa neste mesmo segmento, escolha a opção Pessoa Jurídica.
        </p>
      </div>

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
            <Label htmlFor="rep-titular" className="font-normal cursor-pointer">
              TITULAR
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="procurador" id="rep-procurador" />
            <Label htmlFor="rep-procurador" className="font-normal cursor-pointer">
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
          placeholder=""
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cpfTitular">CPF do Titular *</Label>
          <Input
            id="cpfTitular"
            value={formData.cpf}
            onChange={(e) => updateFormData({ cpf: cpfMask(e.target.value) })}
            placeholder=""
            maxLength={14}
            required
          />
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
            placeholder=""
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
            placeholder=""
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
            placeholder=""
            required
          />
        </div>

        <div>
          <Label htmlFor="complementoTitular">Complemento</Label>
          <Input
            id="complementoTitular"
            value={formData.complemento}
            onChange={(e) => updateFormData({ complemento: e.target.value })}
            placeholder=""
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="bairroTitular">Bairro *</Label>
          <Input
            id="bairroTitular"
            value={formData.bairro}
            onChange={(e) => updateFormData({ bairro: e.target.value })}
            placeholder=""
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
            placeholder=""
            required
          />
        </div>

        <div>
          <Label htmlFor="ufTitular">UF *</Label>
          <Input
            id="ufTitular"
            value={formData.uf}
            onChange={(e) => updateFormData({ uf: e.target.value.toUpperCase() })}
            placeholder=""
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
          placeholder=""
          required
        />
      </div>

      <div>
        <Label htmlFor="rgTitular">Upload do RG do Titular (opcional)</Label>
        <div className="mt-2 flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
          <label htmlFor="rgTitular" className="cursor-pointer text-center">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-sm text-muted-foreground">Clique para fazer upload do RG</p>
          </label>
          <Input
            id="rgTitular"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 5 * 1024 * 1024) {
                toast.error("O arquivo deve ter no máximo 5MB");
                e.target.value = "";
                return;
              }
              updateFormData({ rgTitularUrl: file?.name || "" });
            }}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="diploma">
          Upload do Diploma/Prova de Qualificação Profissional (opcional)
        </Label>
        <div className="mt-2 flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
          <label htmlFor="diploma" className="cursor-pointer text-center">
            <div className="text-4xl mb-2">🎓</div>
            <p className="text-sm text-muted-foreground">Clique para fazer upload do diploma</p>
          </label>
          <Input
            id="diploma"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 5 * 1024 * 1024) {
                toast.error("O arquivo deve ter no máximo 5MB");
                e.target.value = "";
                return;
              }
              updateFormData({ diplomaUrl: file?.name || "" });
            }}
            className="hidden"
          />
        </div>
      </div>

      {formData.representante === "procurador" && (
        <div>
          <Label htmlFor="procuracaoPF">Upload da Procuração (opcional)</Label>
          <div className="mt-2 flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
            <label htmlFor="procuracaoPF" className="cursor-pointer text-center">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-sm text-muted-foreground">Clique para fazer upload da procuração</p>
            </label>
            <Input
              id="procuracaoPF"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
};
