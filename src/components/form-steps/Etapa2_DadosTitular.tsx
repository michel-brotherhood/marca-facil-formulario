import { FormState } from "@/types/formTypes";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TitularPF } from "./TitularPF";
import { TitularPJ } from "./TitularPJ";

interface Etapa2Props {
  formData: FormState["titular"];
  updateFormData: (data: Partial<FormState["titular"]>) => void;
  clienteData: FormState["cliente"];
}

export const Etapa2_DadosTitular = ({ formData, updateFormData, clienteData }: Etapa2Props) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">Dados do Titular da Marca</h2>
        <p className="text-sm md:text-base text-muted-foreground">Informações sobre o titular da marca</p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">
          O Titular (dono) da marca é Pessoa Física ou Pessoa Jurídica? *
        </Label>
        <RadioGroup
          value={formData.tipo}
          onValueChange={(value: "pf" | "pj") => updateFormData({ tipo: value })}
        >
          <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-muted/50 hover:border-primary/50 cursor-pointer transition-all">
            <RadioGroupItem value="pf" id="pf" />
            <Label htmlFor="pf" className="font-normal cursor-pointer flex items-center gap-2 text-base flex-1">
              👤 Pessoa Física
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:bg-muted/50 hover:border-primary/50 cursor-pointer transition-all">
            <RadioGroupItem value="pj" id="pj" />
            <Label htmlFor="pj" className="font-normal cursor-pointer flex items-center gap-2 text-base flex-1">
              🏢 Pessoa Jurídica
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Mostrar campos de Pessoa Física apenas se selecionado */}
      {formData.tipo === "pf" && (
        <TitularPF formData={formData} updateFormData={updateFormData} clienteData={clienteData} />
      )}
      
      {/* Mostrar campos de Pessoa Jurídica apenas se selecionado */}
      {formData.tipo === "pj" && (
        <TitularPJ formData={formData} updateFormData={updateFormData} />
      )}
    </div>
  );
};
