import type { Satellite } from '@/data/mockData';
import GlassCard from './GlassCard';
import { ChevronRight } from 'lucide-react';

interface SatelliteListProps {
  satellites: Satellite[];
  onSelect: (satellite: Satellite) => void;
  selectedId?: string;
}

const SatelliteList = ({ satellites, onSelect, selectedId }: SatelliteListProps) => {
  return (
    <GlassCard title="Satellite List">
      <div className="space-y-1.5">
        {satellites.map(sat => (
          <button
            key={sat.id}
            onClick={() => onSelect(sat)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 group border ${
              selectedId === sat.id
                ? 'bg-primary/15 border-primary/40 neon-glow-blue'
                : 'border-transparent hover:bg-secondary/60 hover:border-primary/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="font-medium text-sm text-foreground">{sat.name}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              sat.status === 'Active' ? 'bg-accent/15 text-accent' :
              sat.status === 'Warning' ? 'bg-warning/15 text-warning' :
              'bg-muted text-muted-foreground'
            }`}>
              {sat.status}
            </span>
          </button>
        ))}
      </div>
    </GlassCard>
  );
};

export default SatelliteList;
