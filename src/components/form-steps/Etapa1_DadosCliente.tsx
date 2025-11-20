import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cpfMask, cepMask, phoneMask } from "@/utils/masks";
import { validateCEP, validateCPF, validateEmail } from "@/utils/validators";
import { toast } from "sonner";
import { FileUpload } from "@/components/FileUpload";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Etapa1Props {
  formData: FormState["cliente"];
  updateFormData: (data: Partial<FormState["cliente"]>) => void;
}

export const Etapa1_DadosCliente = ({ formData, updateFormData }: Etapa1Props) => {
  const [cpfValido, setCpfValido] = useState<boolean | null>(null);
  const [emailValido, setEmailValido] = useState<boolean | null>(null);
  const [telefoneValido, setTelefoneValido] = useState<boolean | null>(null);
  const [cepValido, setCepValido] = useState<boolean | null>(null);
  const [nomeValido, setNomeValido] = useState<boolean | null>(null);
  
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
          <div className="relative">
            <Input
              id="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ nomeCompleto: value });
                if (value.length === 0) {
                  setNomeValido(null);
                } else if (value.length < 3) {
                  setNomeValido(false);
                } else {
                  setNomeValido(true);
                }
              }}
              placeholder="Ex: João da Silva Santos"
              required
              className={
                nomeValido === null
                  ? ""
                  : nomeValido
                  ? "border-green-500 pr-10"
                  : "border-red-500 pr-10"
              }
            />
            {nomeValido !== null && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {nomeValido ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {nomeValido === false && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Nome deve ter pelo menos 3 caracteres
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <div className="relative">
              <Input
                id="cpf"
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
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                CPF inválido
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="telefone">Telefone *</Label>
            <div className="relative">
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => {
                  const value = phoneMask(e.target.value);
                  updateFormData({ telefone: value });
                  const cleanPhone = value.replace(/\D/g, "");
                  if (cleanPhone.length === 0) {
                    setTelefoneValido(null);
                  } else if (cleanPhone.length >= 10) {
                    setTelefoneValido(true);
                  } else {
                    setTelefoneValido(false);
                  }
                }}
                placeholder="(00) 00000-0000"
                maxLength={15}
                required
                className={
                  telefoneValido === null
                    ? ""
                    : telefoneValido
                    ? "border-green-500 pr-10"
                    : "border-red-500 pr-10"
                }
              />
              {telefoneValido !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {telefoneValido ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {telefoneValido === false && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                Telefone incompleto
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">E-mail *</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ email: value });
                if (value.length === 0) {
                  setEmailValido(null);
                } else if (validateEmail(value)) {
                  setEmailValido(true);
                } else {
                  setEmailValido(false);
                }
              }}
              placeholder="seu@email.com"
              required
              className={
                emailValido === null
                  ? ""
                  : emailValido
                  ? "border-green-500 pr-10"
                  : "border-red-500 pr-10"
              }
            />
            {emailValido !== null && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {emailValido ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            )}
          </div>
          {emailValido === false && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              E-mail inválido
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cep">CEP *</Label>
            <div className="relative">
              <Input
                id="cep"
                value={formData.cep}
                onChange={(e) => {
                  const value = cepMask(e.target.value);
                  updateFormData({ cep: value });
                  const cleanCEP = value.replace(/\D/g, "");
                  if (cleanCEP.length === 0) {
                    setCepValido(null);
                  } else if (validateCEP(value)) {
                    setCepValido(true);
                  } else {
                    setCepValido(false);
                  }
                }}
                onBlur={(e) => buscarCEP(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                required
                className={
                  cepValido === null
                    ? ""
                    : cepValido
                    ? "border-green-500 pr-10"
                    : "border-red-500 pr-10"
                }
              />
              {cepValido !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {cepValido ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {cepValido === false && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                CEP inválido
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="logradouro">Logradouro *</Label>
            <Input
              id="logradouro"
              value={formData.logradouro}
              onChange={(e) => updateFormData({ logradouro: e.target.value })}
              placeholder="Ex: Rua das Flores, Avenida Paulista..."
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
              placeholder="Ex: 123, 456-B..."
              required
            />
          </div>

          <div>
            <Label htmlFor="complemento">Complemento</Label>
            <Input
              id="complemento"
              value={formData.complemento}
              onChange={(e) => updateFormData({ complemento: e.target.value })}
              placeholder="Ex: Apto 101, Sala 5, Bloco A..."
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="bairro">Bairro *</Label>
            <Input
              id="bairro"
              value={formData.bairro}
              onChange={(e) => updateFormData({ bairro: e.target.value })}
              placeholder="Ex: Centro, Jardim América..."
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
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              required
            />
          </div>

          <div>
            <Label htmlFor="uf">UF *</Label>
            <Input
              id="uf"
              value={formData.uf}
              onChange={(e) => updateFormData({ uf: e.target.value.toUpperCase() })}
              placeholder="Ex: SP, RJ, MG..."
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
              <Label htmlFor="whatsapp" className="font-normal cursor-pointer flex items-center gap-2 flex-1">
                📱 WhatsApp
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="email" id="email-pref" />
              <Label htmlFor="email-pref" className="font-normal cursor-pointer flex items-center gap-2 flex-1">
                ✉️ E-mail
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="rgCliente">Upload do RG (opcional)</Label>
          <Input
            id="rgCliente"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              
              if (file.size > 5 * 1024 * 1024) {
                toast.error("O arquivo deve ter no máximo 5MB");
                e.target.value = "";
                return;
              }
              
              toast.success(`Arquivo ${file.name} selecionado`);
              updateFormData({ rgClienteUrl: file.name });
            }}
            className="mt-2"
          />
          {formData.rgClienteUrl && (
            <div className="flex items-center justify-between mt-1 p-2 bg-muted/50 rounded">
              <p className="text-sm text-green-600">✓ {formData.rgClienteUrl}</p>
              <button
                type="button"
                onClick={() => {
                  updateFormData({ rgClienteUrl: "" });
                  const input = document.getElementById("rgCliente") as HTMLInputElement;
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
      </div>
    </div>
  );
};
