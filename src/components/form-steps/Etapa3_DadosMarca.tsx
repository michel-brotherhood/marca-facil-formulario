import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Etapa3Props {
  formData: FormState["marca"];
  updateFormData: (data: Partial<FormState["marca"]>) => void;
}

export const Etapa3_DadosMarca = ({ formData, updateFormData }: Etapa3Props) => {
  const [nomeValido, setNomeValido] = useState<boolean | null>(null);
  const [atividadesValido, setAtividadesValido] = useState<boolean | null>(null);
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Informações sobre a Marca</h2>
        <p className="text-sm md:text-base text-muted-foreground">Informações sobre a marca a ser registrada</p>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div>
          <Label htmlFor="nomeMarca">Qual é a marca que vamos registrar? *</Label>
          <div className="relative">
            <Input
              id="nomeMarca"
              value={formData.nome}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ nome: value });
                if (value.length === 0) {
                  setNomeValido(null);
                } else if (value.length >= 2) {
                  setNomeValido(true);
                } else {
                  setNomeValido(false);
                }
              }}
              placeholder="Digite o nome da marca"
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
              Nome da marca muito curto
            </p>
          )}
        </div>

        <div>
          <Label className="mb-3 block">A marca é utilizada para? *</Label>
          <RadioGroup
            value={formData.utilizacao}
            onValueChange={(value: "produtos" | "servicos" | "outros") =>
              updateFormData({ utilizacao: value })
            }
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="produtos" id="produtos" />
              <Label htmlFor="produtos" className="font-normal cursor-pointer flex-1">
                Produzir e/ou Vender PRODUTOS
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="servicos" id="servicos" />
              <Label htmlFor="servicos" className="font-normal cursor-pointer flex-1">
                Prestação de SERVIÇOS
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="outros" id="outros" />
              <Label htmlFor="outros" className="font-normal cursor-pointer flex-1">
                OUTROS
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="atividades">
            Descreva resumidamente as atividades da sua marca *
          </Label>
          <div className="relative">
            <Textarea
              id="atividades"
              value={formData.atividades}
              onChange={(e) => {
                const value = e.target.value;
                updateFormData({ atividades: value });
                if (value.length === 0) {
                  setAtividadesValido(null);
                } else if (value.length >= 10) {
                  setAtividadesValido(true);
                } else {
                  setAtividadesValido(false);
                }
              }}
              placeholder="Ex: Venda de roupas femininas, consultoria em marketing digital, fabricação de produtos alimentícios..."
              rows={4}
              required
              className={`mt-2 bg-muted/30 ${
                atividadesValido === null
                  ? ""
                  : atividadesValido
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <div>
              {atividadesValido === false && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Mínimo de 10 caracteres
                </p>
              )}
              {atividadesValido === true && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Descrição válida
                </p>
              )}
            </div>
            <span className={`text-xs ${formData.atividades.length >= 10 ? 'text-green-600' : 'text-muted-foreground'}`}>
              {formData.atividades.length} caracteres
            </span>
          </div>
        </div>

        <div>
          <Label className="mb-3 block">Possui Logotipo? *</Label>
          <RadioGroup
            value={formData.possuiLogo === null ? "" : formData.possuiLogo.toString()}
            onValueChange={(value) => updateFormData({ possuiLogo: value === "true" })}
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="true" id="logo-sim" />
              <Label htmlFor="logo-sim" className="font-normal cursor-pointer flex-1">
                SIM
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="false" id="logo-nao" />
              <Label htmlFor="logo-nao" className="font-normal cursor-pointer flex-1">
                NÃO
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.possuiLogo === true && (
          <div className="mt-4">
            <p className="font-semibold mb-3 text-sm">Upload do Logotipo</p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-3 text-orange-600 flex items-center gap-2">
                <span>📋</span> Especificações Técnicas
              </h4>
              <ul className="text-sm space-y-1">
                <li><span className="font-semibold text-orange-600">Formato válido:</span> JPG</li>
                <li><span className="font-semibold text-orange-600">Tamanho mínimo:</span> 945 × 945 px (8 × 8 cm)</li>
                <li><span className="font-semibold text-orange-600">Resolução mínima:</span> 300 dpi</li>
                <li><span className="font-semibold text-orange-600">Tamanho máximo:</span> 2 MB</li>
                <li><span className="font-semibold text-orange-600">Padrão de cores:</span> RGB</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
              <p className="font-semibold mb-2 flex items-center gap-2">
                <span>💡</span> DICA DE OURO
              </p>
              <p className="text-sm">
                A menos que uma cor ou combinação de cores específica seja elemento essencial da sua marca, recomendamos apresentar o logotipo em <strong>preto e branco</strong>.
              </p>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-background">
              <div className="flex flex-col items-center gap-3">
                <div className="text-4xl">🎨</div>
                <Label htmlFor="logo" className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  Clique para fazer upload do logotipo
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept=".jpg,.jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    
                    if (file.size > 2 * 1024 * 1024) {
                      toast.error("O arquivo deve ter no máximo 2MB");
                      e.target.value = "";
                      return;
                    }
                    
                    toast.success(`Arquivo ${file.name} selecionado`);
                    updateFormData({ logoUrl: file.name });
                  }}
                  className="hidden"
                  required
                />
              </div>
            </div>
            
            {formData.logoUrl && (
              <div className="flex items-center justify-between mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-medium">✓ {formData.logoUrl}</p>
                <button
                  type="button"
                  onClick={() => {
                    updateFormData({ logoUrl: "" });
                    const input = document.getElementById("logo") as HTMLInputElement;
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
      </div>
    </div>
  );
};
