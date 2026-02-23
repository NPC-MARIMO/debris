import { useMemo } from "react";
import type { Debris } from "@/data/mockData";
import GlassCard from "./GlassCard";
import { ChevronRight } from "lucide-react";

interface DebrisListProps {
  debris: Debris[];
  onSelect: (debris: Debris) => void;
  selectedId?: string;
}

const DebrisList = ({ debris, onSelect, selectedId }: DebrisListProps) => {
  console.log("Rendering DebrisList with debris:", debris, "selectedId:", selectedId);

  // Sort: Highest risk first
  const sortedDebris = useMemo(() => {
    return [...debris].sort(
      (a, b) => (b?.risk_score ?? 0) - (a?.risk_score ?? 0)
    );
  }, [debris]);

  return (
    <GlassCard title="Debris List">
      <div className="space-y-1.5">
        {sortedDebris.map((d) => (
          <button
            key={d?.object_id}
            onClick={() => onSelect(d)}
            className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 border ${
              selectedId === d?.id
                ? "bg-destructive/10 border-destructive/40 neon-glow-red"
                : "border-transparent hover:bg-secondary/50 hover:border-destructive/20"
            }`}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <ChevronRight className="w-3 h-3 text-destructive" />
              <span className="text-sm font-medium text-foreground">
                Debris ID: {d?.object_name}
              </span>
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground ml-5">
              <span>Size: {d?.size_m} m</span>
              <span>Velocity: {d?.relative_velocity_km_s} km/s</span>
              <span>Risk: {d?.risk_score}</span>
            </div>
          </button>
        ))}
      </div>
    </GlassCard>
  );
};


export default DebrisList;