import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'alert';
}

const GlassCard = ({ title, children, className, variant = 'default' }: GlassCardProps) => {
  const variantClass = {
    default: 'glass-card',
    highlight: 'glass-card-highlight',
    alert: 'glass-card-alert',
  }[variant];

  return (
    <div className={cn(variantClass, 'p-4', className)}>
      {title && (
        <h3 className="font-display text-xs font-semibold tracking-widest uppercase text-primary mb-3 neon-text">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default GlassCard;
