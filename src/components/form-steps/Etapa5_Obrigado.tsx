import { Button } from "@/components/ui/button";
import logoImage from "@/assets/logotopo.webp";
import { CheckCircle2, Home, MessageCircle, Clock, Mail, Phone } from "lucide-react";

export const Etapa5_Obrigado = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Logo Section */}
      <div className="w-full flex justify-center pt-12 pb-8">
        <img 
          src={logoImage} 
          alt="Marca Fácil" 
          className="h-16 md:h-20 w-auto animate-scale-in" 
        />
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <div className="relative">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-14 w-14 text-white" strokeWidth={3} />
              </div>
              <div className="absolute inset-0 animate-ping">
                <div className="w-24 h-24 bg-green-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 animate-fade-in">
            Mensagem Enviada com Sucesso!
          </h1>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto animate-fade-in">
            Obrigado por entrar em contato conosco! Sua mensagem foi recebida e nossa equipe 
            especializada entrará em contato em até{" "}
            <span className="font-semibold text-gray-900">24 horas úteis</span>.
          </p>

          {/* Next Steps Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8 mt-10 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Próximos Passos
              </h2>
            </div>
            
            <ul className="text-left space-y-5 max-w-xl mx-auto">
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <div className="pt-2">
                  <p className="text-gray-700 font-medium">
                    Analisaremos sua solicitação com cuidado
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <div className="pt-2">
                  <p className="text-gray-700 font-medium">
                    Entraremos em contato pelo e-mail ou telefone informado
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <div className="pt-2">
                  <p className="text-gray-700 font-medium">
                    Ofereceremos a melhor solução para seu caso
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8 mt-6 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Dúvidas? Entre em contato
              </h3>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:admin@marcafacil.legal"
                className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-base"
              >
                <Mail className="h-5 w-5" />
                admin@marcafacil.legal
              </a>
              <a 
                href="https://wa.me/5521997941008"
                className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-base"
              >
                <Phone className="h-5 w-5" />
                (21) 99794-1008
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in">
            <Button 
              onClick={() => window.location.href = "https://marcafacil.legal"} 
              size="lg"
              variant="outline"
              className="group border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-md font-semibold px-8 text-base h-12"
            >
              <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Voltar ao Site
            </Button>
            <Button 
              onClick={() => window.location.href = "https://wa.me/5521997941008"} 
              size="lg"
              className="group bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-200 shadow-lg font-semibold px-8 text-base h-12"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
