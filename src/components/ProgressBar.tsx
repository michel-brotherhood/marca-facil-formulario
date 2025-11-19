interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step < currentStep
                  ? "bg-success text-success-foreground"
                  : step === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step < currentStep ? "✓" : step}
            </div>
            <span className="text-xs mt-2 text-muted-foreground hidden md:block">
              {step === 1 && "Cliente"}
              {step === 2 && "Titular"}
              {step === 3 && "Marca"}
              {step === 4 && "Confirmar"}
              {step === 5 && "Concluído"}
            </span>
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
