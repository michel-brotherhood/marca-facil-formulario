import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Phone, MessageCircle } from "lucide-react";

export const Etapa5_Obrigado = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="w-24 h-24 text-success" />
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Solicitação Enviada com Sucesso!
        </h1>
        <p className="text-lg text-muted-foreground">
          Sua solicitação de registro de marca foi recebida e está sendo processada.
        </p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
          <ol className="text-left space-y-3">
            <li className="flex gap-3">
              <span className="font-bold text-primary">1.</span>
              <span>
                Nossa equipe analisará sua solicitação e entrará em contato em até 48 horas
                úteis.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">2.</span>
              <span>
                Você receberá um orçamento detalhado e informações sobre o processo de registro.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary">3.</span>
              <span>
                Após aprovação, iniciaremos o processo de busca de viabilidade e registro no
                INPI.
              </span>
            </li>
          </ol>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">Precisa de ajuda?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            contato@marcafacil.legal
          </Button>
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            (11) 9999-9999
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </Button>
        </div>
      </div>

      <div className="pt-8">
        <Button onClick={() => window.location.href = "/"} size="lg">
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};
