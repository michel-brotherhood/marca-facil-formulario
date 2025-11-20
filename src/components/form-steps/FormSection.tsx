import { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FormSection = ({ title, description, children, className = "" }: FormSectionProps) => {
  return (
    <div className={`space-y-4 md:space-y-6 ${className}`}>
      <div className="space-y-1">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
