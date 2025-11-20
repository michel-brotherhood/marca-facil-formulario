import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import logoImage from "@/assets/logotopo.webp";

export const Etapa5_Obrigado = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://wa.me/5511999999999";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)" }}>
      {/* Logo */}
      <div className="w-full flex justify-center pt-8 pb-6">
        <img src={logoImage} alt="Marca Fácil" className="h-16 md:h-20" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Mensagem Enviada com Sucesso!
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            Obrigado por entrar em contato conosco! Sua mensagem foi recebida e nossa equipe especializada entrará em contato em até{" "}
            <span className="font-bold text-white">24 horas úteis</span>.
          </p>

          {/* Próximos Passos */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 md:p-8 mt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
              📋 Próximos Passos
            </h2>
            <ul className="text-left space-y-4 text-white/90">
              <li className="flex gap-3">
                <span className="font-bold text-white">•</span>
                <span>Analisaremos sua solicitação com cuidado</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-white">•</span>
                <span>Entraremos em contato pelo e-mail ou telefone informado</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-white">•</span>
                <span>Ofereceremos a melhor solução para seu caso</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={() => window.location.href = "/"} 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8"
            >
              🏠 Voltar ao Site
            </Button>
            <Button 
              onClick={() => window.location.href = "https://wa.me/5511999999999"} 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8"
            >
              📱 WhatsApp
            </Button>
          </div>

          <p className="text-white/70 text-sm mt-6">
            Você será redirecionado automaticamente em 4 segundos...
          </p>
        </div>
      </div>
    </div>
  );
};
