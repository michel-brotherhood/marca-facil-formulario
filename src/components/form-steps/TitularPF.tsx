import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cpfMask, cepMask } from "@/utils/masks";
import { validateCEP } from "@/utils/validators";
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
          O titular possui sociedade registrada com a mesma atividade? *
        </Label>
        <RadioGroup
          value={formData.possuiSociedade === null ? "" : formData.possuiSociedade.toString()}
          onValueChange={(value) =>
            updateFormData({ possuiSociedade: value === "true" })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="sociedade-sim" />
            <Label htmlFor="sociedade-sim" className="font-normal cursor-pointer">
              Sim
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="sociedade-nao" />
            <Label htmlFor="sociedade-nao" className="font-normal cursor-pointer">
              Não
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block">
          O titular da marca é você mesmo ou procurador? *
        </Label>
        <RadioGroup
          value={formData.representante}
          onValueChange={(value: "titular" | "procurador") =>
            updateFormData({ representante: value })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="titular" id="rep-titular" />
            <Label htmlFor="rep-titular" className="font-normal cursor-pointer">
              Eu mesmo (Titular)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="procurador" id="rep-procurador" />
            <Label htmlFor="rep-procurador" className="font-normal cursor-pointer">
              Procurador
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
          placeholder="Digite o nome completo"
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
            placeholder="000.000.000-00"
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
            placeholder="Rua, Avenida..."
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
            placeholder="123"
            required
          />
        </div>

        <div>
          <Label htmlFor="complementoTitular">Complemento</Label>
          <Input
            id="complementoTitular"
            value={formData.complemento}
            onChange={(e) => updateFormData({ complemento: e.target.value })}
            placeholder="Apto, Sala..."
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="bairroTitular">Bairro *</Label>
          <Input
            id="bairroTitular"
            value={formData.bairro}
            onChange={(e) => updateFormData({ bairro: e.target.value })}
            placeholder="Nome do bairro"
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
            placeholder="Nome da cidade"
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
          placeholder="Digite sua profissão"
          required
        />
      </div>

      <div>
        <Label htmlFor="rgTitular">Upload do RG do Titular (Opcional)</Label>
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
          className="cursor-pointer"
        />
      </div>

      <div>
        <Label htmlFor="diploma">
          Upload do Diploma ou Prova de Qualificação (Opcional)
        </Label>
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
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
