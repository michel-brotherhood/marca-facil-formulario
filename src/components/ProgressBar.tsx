interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-muted/30 h-1 md:h-2 mb-4 md:mb-6">
      <div
        className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] transition-all duration-500 ease-out shadow-sm"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
