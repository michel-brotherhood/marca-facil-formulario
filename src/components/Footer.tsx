import logoSvg from "@/assets/slogo.svg";

export const Footer = () => {
  return (
    <footer className="bg-[#7c3aed] text-white py-8 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="flex flex-col items-center sm:items-start">
            <img 
              src={logoSvg}
              alt="Logo MarcaFácil.legal" 
              className="h-16 md:h-20 w-auto mb-4"
            />
            <p className="text-sm md:text-base text-white/90 leading-relaxed text-center sm:text-left">
              Facilitamos o registro da sua marca com segurança e agilidade.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-3">Contato</h3>
            <div className="space-y-2">
              <p className="text-sm md:text-base text-white/90 flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:atendimento@marcafacil.legal" className="hover:text-white transition-colors">
                  atendimento@marcafacil.legal
                </a>
              </p>
              <p className="text-sm md:text-base text-white/90 flex items-center gap-2">
                <span>📱</span>
                <a href="https://wa.me/5521997941008" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: (21) 99794-1008
                </a>
              </p>
              <p className="text-sm md:text-base text-white/90 flex items-center gap-2">
                <span>☎️</span>
                <a href="tel:+5521997941008" className="hover:text-white transition-colors">
                  Telefone: (21) 99794-1008
                </a>
              </p>
            </div>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg md:text-xl mb-3">Horário de Atendimento</h3>
            <p className="text-sm md:text-base text-white/90">
              Segunda a Sexta: 9h às 18h
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 md:mt-8 pt-6 text-center">
          <p className="text-xs md:text-sm text-white/80">
            © 2025 MarcaFácil.legal - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};
