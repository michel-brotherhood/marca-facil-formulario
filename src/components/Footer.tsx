import logoSvg from "@/assets/slogo.svg";
import { Mail, MessageCircle, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 md:py-12 mt-12 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <div className="flex flex-col items-center md:items-start">
            <img 
              src={logoSvg}
              alt="Logo MarcaFácil.legal" 
              className="h-16 md:h-20 w-auto mb-2"
            />
            <p className="text-xs md:text-sm opacity-80 mb-4 text-center md:text-left">
              CNPJ: 61.973.476/0001-01
            </p>
            <p className="text-sm md:text-base opacity-90 leading-relaxed text-center md:text-left max-w-xs">
              Facilitamos o registro da sua marca com segurança e agilidade.
            </p>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg md:text-xl mb-4">Contato</h3>
            <div className="space-y-3">
              <a 
                href="mailto:atendimento@marcafacil.legal" 
                className="flex items-center justify-center md:justify-start gap-3 text-sm md:text-base opacity-90 hover:opacity-100 transition-opacity group"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="break-words max-w-full">atendimento@marcafacil.legal</span>
              </a>
              <a 
                href="https://wa.me/5521997941008" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-start gap-3 text-sm md:text-base opacity-90 hover:opacity-100 transition-opacity group"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />
                <span>(21) 99794-1008</span>
              </a>
              <a 
                href="https://marcafacil.legal" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-start gap-3 text-sm md:text-base opacity-90 hover:opacity-100 transition-opacity group"
              >
                <Globe className="h-5 w-5 flex-shrink-0" />
                <span>marcafacil.legal</span>
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left md:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg md:text-xl mb-4">Horário de Atendimento</h3>
            <p className="text-sm md:text-base opacity-90">
              Segunda a Sexta: 9h às 18h
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-xs md:text-sm opacity-80">
            © 2025 MarcaFácil.legal - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
