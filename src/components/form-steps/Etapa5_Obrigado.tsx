import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logotopo.webp";
import { CheckCircle2, Home, MessageCircle, Clock, Mail, ArrowRight } from "lucide-react";

export const Etapa5_Obrigado = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary via-primary/90 to-primary/80 animate-fade-in">
      {/* Logo */}
      <div className="w-full flex justify-center pt-8 pb-6 animate-scale-in">
        <img src={logoImage} alt="Marca Fácil" className="h-16 md:h-20 drop-shadow-lg" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-4 animate-scale-in">
            <div className="relative">
              <CheckCircle2 className="h-20 w-20 md:h-24 md:w-24 text-white drop-shadow-lg" />
              <div className="absolute inset-0 animate-ping">
                <CheckCircle2 className="h-20 w-20 md:h-24 md:w-24 text-white opacity-30" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
            Mensagem Enviada com Sucesso!
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed animate-fade-in">
            Obrigado por entrar em contato conosco! Sua mensagem foi recebida e nossa equipe especializada entrará em contato em até{" "}
            <span className="font-bold text-primary-foreground">24 horas úteis</span>.
          </p>

          {/* Próximos Passos */}
          <div className="bg-background/95 backdrop-blur-sm rounded-xl p-6 md:p-8 mt-8 shadow-2xl animate-fade-in border border-primary/20">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6 flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              Próximos Passos
            </h2>
            <ul className="text-left space-y-4 text-foreground/80 max-w-xl mx-auto">
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  1
                </div>
                <span className="pt-1">Analisaremos sua solicitação com cuidado</span>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  2
                </div>
                <span className="pt-1">Entraremos em contato pelo e-mail ou telefone informado</span>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  3
                </div>
                <span className="pt-1">Ofereceremos a melhor solução para seu caso</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-background/95 backdrop-blur-sm rounded-xl p-6 md:p-8 mt-6 shadow-2xl animate-fade-in border border-primary/20">
            <p className="text-foreground/80 mb-4 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="font-semibold">Dúvidas? Entre em contato:</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:atendimento@marcafacil.legal"
                className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4 text-sm md:text-base"
              >
                atendimento@marcafacil.legal
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a 
                href="https://wa.me/5521997941008"
                className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4 text-sm md:text-base"
              >
                (21) 99794-1008
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in">
            <Button 
              onClick={() => window.location.href = "https://marcafacil.legal"} 
              size="lg"
              variant="secondary"
              className="group hover:scale-105 transition-all duration-200 shadow-lg font-semibold px-8"
            >
              <Home className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Voltar ao Site
            </Button>
            <Button 
              onClick={() => window.location.href = "https://wa.me/5521997941008"} 
              size="lg"
              className="group bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all duration-200 shadow-lg font-semibold px-8"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Falar no WhatsApp
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
