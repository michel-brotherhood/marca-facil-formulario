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
        {formData.possuiSociedade === true && (
          <p className="mt-2 text-sm font-medium text-orange-600">
            ⚠️ Se você é sócio de empresa neste mesmo segmento, escolha a opção Pessoa Jurídica.
          </p>
        )}
      </div>

      {/* Mostrar campos apenas se possuiSociedade for false */}
      {formData.possuiSociedade === false && (
        <>
          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
            <p className="text-sm font-medium">
              📅 Está em dúvidas sobre como registrar a sua marca?
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Precisa de ajuda para preencher o nosso formulário?
            </p>
            <a
              href="https://calendly.com/admin-marcafacil/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              ☕ Agendar Videoconferência Gratuita (30 min)
            </a>
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
          className="mt-2"
        />
        {formData.rgTitularUrl && (
          <div className="flex items-center justify-between mt-1 p-2 bg-muted/50 rounded">
            <p className="text-sm text-green-600">✓ {formData.rgTitularUrl}</p>
            <button
              type="button"
              onClick={() => {
                updateFormData({ rgTitularUrl: "" });
                const input = document.getElementById("rgTitular") as HTMLInputElement;
                if (input) input.value = "";
                toast.success("Arquivo removido");
              }}
              className="text-red-600 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="diploma">Upload do Diploma/Prova de Qualificação Profissional (opcional)</Label>
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
          className="mt-2"
        />
        {formData.diplomaUrl && (
          <div className="flex items-center justify-between mt-1 p-2 bg-muted/50 rounded">
            <p className="text-sm text-green-600">✓ {formData.diplomaUrl}</p>
            <button
              type="button"
              onClick={() => {
                updateFormData({ diplomaUrl: "" });
                const input = document.getElementById("diploma") as HTMLInputElement;
                if (input) input.value = "";
                toast.success("Arquivo removido");
              }}
              className="text-red-600 hover:text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {formData.representante === "procurador" && (
        <div>
          <Label htmlFor="procuracaoPF">Upload da Procuração (opcional)</Label>
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
            className="mt-2"
          />
          {formData.procuracaoUrl && (
            <div className="flex items-center justify-between mt-1 p-2 bg-muted/50 rounded">
              <p className="text-sm text-green-600">✓ {formData.procuracaoUrl}</p>
              <button
                type="button"
                onClick={() => {
                  updateFormData({ procuracaoUrl: "" });
                  const input = document.getElementById("procuracaoPF") as HTMLInputElement;
                  if (input) input.value = "";
                  toast.success("Arquivo removido");
                }}
                className="text-red-600 hover:text-red-700 font-bold"
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
