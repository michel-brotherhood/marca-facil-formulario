interface HeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const Header = ({ currentStep, totalSteps }: HeaderProps) => {
  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl font-bold text-primary">MarcaFácil.legal</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step === currentStep
                    ? "bg-primary text-primary-foreground"
                    : step < currentStep
                    ? "bg-success text-success-foreground"
                    : "bg-muted text-muted-foreground"
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
