import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const testimonials = [
  {
    text: "Nossa equipe analisará sua solicitação e apresentará uma proposta personalizada."
  },
  {
    text: "Se sua marca precisar ser registrada em múltiplas classes, informaremos sobre as opções disponíveis durante a análise."
  },
  {
    text: "Se na análise descobrirmos que não é possível registrar essa marca, te orientamos para definir uma nova marca."
  },
  {
    text: "Oferecemos suporte completo durante todo o processo de registro da sua marca."
  },
  {
    text: "Nossa equipe tem experiência em defender marcas em casos de oposição no INPI."
  }
];

export const Sidebar = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="flex flex-col gap-5">
      {/* Atendimento */}
      <Card className="bg-card/95 backdrop-blur-sm shadow-lg border">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-primary font-semibold mb-4 flex items-center justify-center gap-2">
              <span>📞</span>
              <span>Atendimento</span>
            </h3>
            <div className="text-2xl font-bold text-primary mb-4">
              (21) 99794-1008
            </div>
            <a 
              href="https://wa.me/5521997941008" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25d366] text-white px-5 py-3 rounded-full font-semibold transition-all hover:bg-[#128c7e] hover:-translate-y-0.5"
            >
              <span>💬</span>
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Informes */}
      <Card className="bg-card/95 backdrop-blur-sm shadow-lg border">
        <CardContent className="pt-6">
          <h3 className="text-primary font-semibold mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>Informes</span>
          </h3>
          <div className="bg-muted/50 p-5 rounded-lg border-l-4 border-primary">
            <p className="italic text-muted-foreground text-center transition-opacity duration-500">
              {testimonials[currentTestimonial].text}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card className="bg-card/95 backdrop-blur-sm shadow-lg border">
        <CardContent className="pt-6">
          <h3 className="text-primary font-semibold mb-4 flex items-center gap-2">
            <span>🔒</span>
            <span>Segurança</span>
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg text-green-900 dark:text-green-100">
              <span>🔐</span>
              <span>SSL Certificado</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg text-green-900 dark:text-green-100">
              <span>🛡️</span>
              <span>Dados Protegidos</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 bg-green-50 dark:bg-green-950/20 rounded-lg text-green-900 dark:text-green-100">
              <span>✅</span>
              <span>100% Confiável</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Precisa de Ajuda? */}
      <Card className="bg-card/95 backdrop-blur-sm shadow-lg border">
        <CardContent className="pt-6">
          <h3 className="text-primary font-semibold mb-4 flex items-center gap-2">
            <span>❓</span>
            <span>Precisa de Ajuda?</span>
          </h3>
          <p className="text-muted-foreground mb-4 text-center">
            Nossa equipe está pronta para te ajudar!
          </p>
          <a 
            href="https://wa.me/5521997941008" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-[#25d366] text-white px-5 py-3 rounded-full font-semibold transition-all hover:bg-[#128c7e] hover:-translate-y-0.5"
          >
            <span>💬</span>
            <span>Chamar no WhatsApp</span>
          </a>
        </CardContent>
      </Card>
    </aside>
  );
};
