import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Etapa3Props {
  formData: FormState["marca"];
  updateFormData: (data: Partial<FormState["marca"]>) => void;
}

export const Etapa3_DadosMarca = ({ formData, updateFormData }: Etapa3Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados da Marca</h2>
        <p className="text-muted-foreground">Informações sobre a marca a ser registrada</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="nomeMarca">Qual é a marca que vamos registrar? *</Label>
          <Input
            id="nomeMarca"
            value={formData.nome}
            onChange={(e) => updateFormData({ nome: e.target.value })}
            placeholder="Digite o nome da marca"
            required
          />
        </div>

        <div>
          <Label className="mb-3 block">A marca é utilizada para? *</Label>
          <RadioGroup
            value={formData.utilizacao}
            onValueChange={(value: "produtos" | "servicos" | "outros") =>
              updateFormData({ utilizacao: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="produtos" id="produtos" />
              <Label htmlFor="produtos" className="font-normal cursor-pointer">
                Produtos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="servicos" id="servicos" />
              <Label htmlFor="servicos" className="font-normal cursor-pointer">
                Serviços
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outros" id="outros" />
              <Label htmlFor="outros" className="font-normal cursor-pointer">
                Outros
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="atividades">
            Descreva resumidamente as atividades da sua marca *
          </Label>
          <Textarea
            id="atividades"
            value={formData.atividades}
            onChange={(e) => updateFormData({ atividades: e.target.value })}
            placeholder="Descreva as principais atividades e produtos/serviços da marca..."
            rows={4}
            required
          />
        </div>

        <div>
          <Label className="mb-3 block">Possui Logotipo? *</Label>
          <RadioGroup
            value={formData.possuiLogo === null ? "" : formData.possuiLogo.toString()}
            onValueChange={(value) => updateFormData({ possuiLogo: value === "true" })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="logo-sim" />
              <Label htmlFor="logo-sim" className="font-normal cursor-pointer">
                Sim, possuo logotipo
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="logo-nao" />
              <Label htmlFor="logo-nao" className="font-normal cursor-pointer">
                Não, apenas o nome
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.possuiLogo === true && (
          <div>
            <Label htmlFor="logo">Upload do Logotipo *</Label>
            <Input
              id="logo"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > 5 * 1024 * 1024) {
                  toast.error("O arquivo deve ter no máximo 5MB");
                  e.target.value = "";
                  return;
                }
                updateFormData({ logoUrl: file?.name || "" });
              }}
              required
              className="cursor-pointer"
            />
            
            <Card className="mt-4 bg-accent/10 border-accent">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2 text-accent-foreground">
                  📋 Especificações Técnicas
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Formato: JPG, PNG ou PDF</li>
                  <li>• Tamanho máximo: 5MB</li>
                  <li>• Resolução mínima: 300 DPI</li>
                  <li>• Dimensões recomendadas: 8cm x 8cm</li>
                </ul>
                
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <p className="text-sm font-medium text-primary mb-1">💡 Dica de Ouro</p>
                  <p className="text-xs text-muted-foreground">
                    Para registros mais abrangentes, considere enviar seu logotipo em preto e
                    branco. Isso permite maior flexibilidade no uso de cores posteriormente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
