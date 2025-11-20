interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1: return "Dados do Cliente";
      case 2: return "Dados do Titular";
      case 3: return "Dados da Marca";
      case 4: return "Confirmação";
      case 5: return "Finalizado";
      default: return "";
    }
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm font-medium text-white">
            {getStepLabel(currentStep)}
          </span>
          <span className="text-xs md:text-sm font-bold text-white">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative w-full bg-white/20 rounded-full h-2 md:h-3 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-white to-white/90 transition-all duration-700 ease-out shadow-lg animate-pulse"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-0 left-0 h-full bg-white/40 blur-sm"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
