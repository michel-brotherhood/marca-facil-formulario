export const Footer = () => {
  return (
    <footer className="bg-[#7c3aed] text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">MarcaFácil.legal</h3>
            <p className="text-sm text-white/90">
              Facilitamos o registro da sua marca com segurança e agilidade.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Contato</h3>
            <p className="text-sm text-white/90 mb-2">
              📧 contato@marcafacil.legal
            </p>
            <p className="text-sm text-white/90">
              📱 WhatsApp: (11) 99999-9999
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Horário de Atendimento</h3>
            <p className="text-sm text-white/90">
              Segunda a Sexta: 9h às 18h
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 pt-6 text-center text-sm text-white/80">
          <p>© 2025 MarcaFácil.legal - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};
