import { FormState } from "@/types/formTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { FileUpload } from "@/components/FileUpload";

interface Etapa3Props {
  formData: FormState["marca"];
  updateFormData: (data: Partial<FormState["marca"]>) => void;
}

export const Etapa3_DadosMarca = ({ formData, updateFormData }: Etapa3Props) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Informações sobre a Marca</h2>
        <p className="text-sm md:text-base text-muted-foreground">Informações sobre a marca a ser registrada</p>
      </div>

      <div className="space-y-4 md:space-y-5">
        <div>
          <Label htmlFor="nomeMarca">Qual é a marca que vamos registrar? *</Label>
          <Input
            id="nomeMarca"
            value={formData.nome}
            onChange={(e) => updateFormData({ nome: e.target.value })}
            placeholder=""
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
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="produtos" id="produtos" />
              <Label htmlFor="produtos" className="font-normal cursor-pointer">
                Produzir e/ou Vender PRODUTOS
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="servicos" id="servicos" />
              <Label htmlFor="servicos" className="font-normal cursor-pointer">
                Prestação de SERVIÇOS
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="outros" id="outros" />
              <Label htmlFor="outros" className="font-normal cursor-pointer">
                OUTROS
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
            placeholder=""
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
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="true" id="logo-sim" />
              <Label htmlFor="logo-sim" className="font-normal cursor-pointer">
                SIM
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
              <RadioGroupItem value="false" id="logo-nao" />
              <Label htmlFor="logo-nao" className="font-normal cursor-pointer">
                NÃO
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.possuiLogo === true && (
          <div>
            <Card className="mt-4 bg-muted/50">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-3">
                  📋 Especificações Técnicas
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground mb-4">
                  <li>• <strong>Formato válido:</strong> JPG</li>
                  <li>• <strong>Tamanho mínimo:</strong> 945 × 945 px (8 × 8 cm)</li>
                  <li>• <strong>Resolução mínima:</strong> 300 dpi</li>
                  <li>• <strong>Tamanho máximo:</strong> 2 MB</li>
                  <li>• <strong>Padrão de cores:</strong> RGB</li>
                </ul>
                
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
                  <p className="text-sm font-semibold mb-1">💡 DICA DE OURO</p>
                  <p className="text-sm text-muted-foreground">
                    A menos que uma cor ou combinação de cores específica seja elemento essencial da sua marca, recomendamos apresentar o logotipo em <strong>preto e branco</strong>.
                  </p>
                </div>

                <FileUpload
                  label=""
                  tipoArquivo="logo"
                  maxSize={2}
                  acceptedTypes=".jpg,.jpeg"
                  onUploadSuccess={(result) => {
                    if (result.fileId) {
                      updateFormData({ logoUrl: result.fileName || "" });
                    }
                  }}
                  currentFile={formData.logoUrl}
                  showPreview={true}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
