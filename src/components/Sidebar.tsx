import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  return (
    <aside className="space-y-4">
      <Card className="bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-1">Atendimento</h3>
              <a href="tel:+5521997941008" className="text-lg font-bold text-foreground hover:text-primary">
                (21) 99794-1008
              </a>
            </div>
          </div>
          <Button className="w-full gap-2" asChild>
            <a href="https://wa.me/5521997941008" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">📋</span>
            <h3 className="font-semibold text-blue-900">Informes</h3>
          </div>
          <p className="text-sm text-blue-800 italic">
            Nossa equipe analisará sua solicitação e apresentará uma proposta personalizada.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">🔒</span>
            <h3 className="font-semibold text-green-900">Segurança</h3>
          </div>
          <div className="space-y-2 text-sm text-green-800">
            <div className="flex items-center gap-2">
              <span>🔑</span>
              <span>SSL Certificado</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🛡️</span>
              <span>Dados Protegidos</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>100% Confiável</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">❓</span>
            <h3 className="font-semibold text-orange-900">Precisa de Ajuda?</h3>
          </div>
          <p className="text-sm text-orange-800 mb-3">
            Nossa equipe está pronta para te ajudar!
          </p>
          <Button variant="outline" className="w-full gap-2 border-green-500 text-green-700 hover:bg-green-50" asChild>
            <a href="https://wa.me/5521997941008" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Chamar no WhatsApp
            </a>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};
