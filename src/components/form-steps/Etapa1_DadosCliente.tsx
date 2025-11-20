import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cpfMask, cepMask, phoneMask } from "@/utils/masks";
import { validateCEP } from "@/utils/validators";
import { toast } from "sonner";
import { FileUpload } from "@/components/FileUpload";

interface Etapa1Props {
  formData: FormState["cliente"];
  updateFormData: (data: Partial<FormState["cliente"]>) => void;
}

export const Etapa1_DadosCliente = ({ formData, updateFormData }: Etapa1Props) => {
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
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Dados do Cliente</h2>
        <p className="text-sm md:text-base text-muted-foreground">Preencha seus dados pessoais</p>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div>
          <Label htmlFor="nomeCompleto">Nome Completo *</Label>
          <Input
            id="nomeCompleto"
            value={formData.nomeCompleto}
            onChange={(e) => updateFormData({ nomeCompleto: e.target.value })}
            placeholder="Digite seu nome completo"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => updateFormData({ cpf: cpfMask(e.target.value) })}
              placeholder="000.000.000-00"
              maxLength={14}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => updateFormData({ telefone: phoneMask(e.target.value) })}
              placeholder="(00) 00000-0000"
              maxLength={15}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cep">CEP *</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => updateFormData({ cep: cepMask(e.target.value) })}
              onBlur={(e) => buscarCEP(e.target.value)}
              placeholder="00000-000"
              maxLength={9}
              required
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="logradouro">Logradouro *</Label>
            <Input
              id="logradouro"
              value={formData.logradouro}
              onChange={(e) => updateFormData({ logradouro: e.target.value })}
              placeholder="Rua, Avenida..."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="numero">Número *</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => updateFormData({ numero: e.target.value })}
              placeholder="123"
              required
            />
          </div>

          <div>
            <Label htmlFor="complemento">Complemento</Label>
            <Input
              id="complemento"
              value={formData.complemento}
              onChange={(e) => updateFormData({ complemento: e.target.value })}
              placeholder="Apto, Sala..."
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="bairro">Bairro *</Label>
            <Input
              id="bairro"
              value={formData.bairro}
              onChange={(e) => updateFormData({ bairro: e.target.value })}
              placeholder="Nome do bairro"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="cidade">Cidade *</Label>
            <Input
              id="cidade"
              value={formData.cidade}
              onChange={(e) => updateFormData({ cidade: e.target.value })}
              placeholder="Nome da cidade"
              required
            />
          </div>

          <div>
            <Label htmlFor="uf">UF *</Label>
            <Input
              id="uf"
              value={formData.uf}
              onChange={(e) => updateFormData({ uf: e.target.value.toUpperCase() })}
              placeholder="SP"
              maxLength={2}
              required
            />
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Preferência de Contato *</Label>
          <RadioGroup
            value={formData.preferenciaContato}
            onValueChange={(value: "whatsapp" | "email") =>
              updateFormData({ preferenciaContato: value })
            }
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="whatsapp" id="whatsapp" />
              <Label htmlFor="whatsapp" className="font-normal cursor-pointer flex items-center gap-2">
                📱 WhatsApp
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="email" id="email-pref" />
              <Label htmlFor="email-pref" className="font-normal cursor-pointer flex items-center gap-2">
                ✉️ E-mail
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="rgCliente">Upload do RG (opcional)</Label>
          <div className="mt-2 flex items-center justify-center border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
            <label htmlFor="rgCliente" className="cursor-pointer text-center">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-sm text-muted-foreground">Clique para fazer upload do RG</p>
            </label>
            <Input
              id="rgCliente"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  toast.error("O arquivo deve ter no máximo 5MB");
                  e.target.value = "";
                  return;
                }
                updateFormData({ rgClienteUrl: file?.name || "" });
              }}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
