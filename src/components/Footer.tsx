export const Footer = () => {
  return (
    <footer className="bg-[#7c3aed] text-white py-8 md:py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-3">MarcaFácil.legal</h3>
            <p className="text-sm md:text-base text-white/90 leading-relaxed">
              Facilitamos o registro da sua marca com segurança e agilidade.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-3">Contato</h3>
            <div className="space-y-2">
              <p className="text-sm md:text-base text-white/90 flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:contato@marcafacil.legal" className="hover:text-white transition-colors">
                  contato@marcafacil.legal
                </a>
              </p>
              <p className="text-sm md:text-base text-white/90 flex items-center gap-2">
                <span>📱</span>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: (11) 99999-9999
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
