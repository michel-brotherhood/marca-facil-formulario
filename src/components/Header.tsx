import logoSvg from "@/assets/slogo.svg";

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const Header = ({ currentStep, totalSteps }: HeaderProps) => {
  return (
    <header className="bg-[#7c3aed] border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logoSvg} alt="Logo" className="h-12 w-auto" />
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step === currentStep
                    ? "bg-white text-[#7c3aed]"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-white/20 text-white"
                }`}
              >
                {step < currentStep ? "✓" : step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
