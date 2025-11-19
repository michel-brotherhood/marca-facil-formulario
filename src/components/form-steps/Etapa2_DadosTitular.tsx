import { FormState } from "@/types/formTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TitularPF } from "./TitularPF";
import { TitularPJ } from "./TitularPJ";

interface Etapa2Props {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
}

export const Etapa2_DadosTitular = ({ formData, updateFormData }: Etapa2Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dados do Titular</h2>
        <p className="text-muted-foreground">Informações sobre o titular da marca</p>
      </div>

      <div>
        <Label className="mb-3 block">O Titular (dono) da marca é Pessoa Física ou Pessoa Jurídica? *</Label>
        <RadioGroup
          value={formData.tipo}
          onValueChange={(value: "pf" | "pj") => updateFormData({ tipo: value })}
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="pf" id="pf" />
            <Label htmlFor="pf" className="font-normal cursor-pointer flex items-center gap-2">
              👤 Pessoa Física
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
            <RadioGroupItem value="pj" id="pj" />
            <Label htmlFor="pj" className="font-normal cursor-pointer flex items-center gap-2">
              🏢 Pessoa Jurídica
            </Label>
          </div>
        </RadioGroup>
      </div>

      {formData.tipo === "pf" ? (
        <TitularPF formData={formData} updateFormData={updateFormData} />
      ) : (
        <TitularPJ formData={formData} updateFormData={updateFormData} />
      )}
    </div>
  );
};
