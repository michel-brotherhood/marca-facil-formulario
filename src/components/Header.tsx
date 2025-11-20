import logoSvg from "@/assets/slogo.svg";

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const Header = ({ currentStep, totalSteps }: HeaderProps) => {
  return (
    <header className="bg-[#7c3aed] border-b border-[#6d28d9] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center flex-shrink-0">
            <img 
              src={logoSvg} 
              alt="MarcaFácil.legal" 
              className="h-10 sm:h-12 w-auto" 
            />
          </div>
          
          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`
                  w-8 h-8 md:w-10 md:h-10 
                  rounded-full 
                  flex items-center justify-center 
                  text-sm md:text-base
                  font-semibold 
                  transition-all duration-200
                  ${
                    step === currentStep
                      ? "bg-white text-[#7c3aed] shadow-md scale-110"
                      : step < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-white/20 text-white"
                  }
                `}
              >
                {step < currentStep ? "✓" : step}
              </div>
            ))}
          </div>
          
          {/* Mobile step indicator */}
          <div className="flex sm:hidden items-center gap-2 text-white">
            <span className="text-sm font-medium">
              Etapa {currentStep}/{totalSteps}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
