import { ArrowLeft, Satellite } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  subtitle?: string;
}

const Header = ({ onBack, subtitle }: HeaderProps) => {
  return (
    <header className="relative px-6 py-4">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-lg glass-card hover:neon-glow-blue transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
        )}
        <div className="flex items-center gap-3">
          <Satellite className="w-6 h-6 text-primary" />
          <div>
            <h1 className="font-display text-lg md:text-2xl font-bold tracking-wider text-foreground neon-text">
              Collision Avoidance Monitoring
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="header-gradient mt-3" />
    </header>
  );
};

export default Header;
