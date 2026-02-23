import axios from "axios";
import { useEffect, useState } from "react";
import GlassCard from "./GlassCard";

const RiskPanel = ({satellite, debris}) => {
  const [maneuverData, setManeuverData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(satellite, debris, 'RiskPanel props');

  useEffect(() => {
    const calculateManeuver = async () => {
      setLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:8000/maneuver/calculate', {
          satellite,
          debris
        });
        const data = response.data;
        setManeuverData(data);
      } catch (error) {
        console.error('Failed to calculate maneuver:', error);
      } finally {
        setLoading(false);
      }
    };

    if (satellite && debris) {
      calculateManeuver();
    }
  }, [satellite, debris]);

  return (
    <GlassCard title="Risk to Safe Maneuver" variant="alert">
      <div className="space-y-4">
        {/* Collision Probability */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-destructive text-sm">▸</span>
            <span className="text-muted-foreground text-sm w-40 shrink-0">Collision Probability:</span>
            <span className="text-sm font-bold animate-pulse-glow">{debris?.risk_score > 0.7 ? 'High' : debris?.risk_score < 0.3 ? 'Low' : 'Medium'}</span>
          </div>
          <div className="ml-6 mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-destructive rounded-full transition-all" style={{width: `${(debris?.risk_score || 0) * 100}%`}}></div>
          </div>
        </div>

        {/* ΔV Required */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-sm">▸</span>
            <span className="text-muted-foreground text-sm w-40 shrink-0">ΔV Required:</span>
            <span className="text-sm font-medium text-foreground">{loading ? '—' : maneuverData?.delta_v_required?.toFixed(1)} m/s</span>
          </div>
          <div className="ml-6 mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{width: `${Math.min((maneuverData?.delta_v_required || 0) / 10 * 100, 100)}%`}}></div>
          </div>
        </div>

        {/* Fuel Estimate */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-sm">▸</span>
            <span className="text-muted-foreground text-sm w-40 shrink-0">Fuel Estimate:</span>
            <span className="text-sm font-medium text-foreground">{loading ? '—' : maneuverData?.fuel_cost_kg?.toFixed(1)} kg</span>
          </div>
          <div className="ml-6 mt-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{width: `${Math.min((maneuverData?.fuel_cost_kg || 0) / 50 * 100, 100)}%`}}></div>
          </div>
        </div>

        {/* Maneuver Type */}
        <div className="flex items-center gap-2">
          <span className="text-primary text-sm">▸</span>
          <span className="text-muted-foreground text-sm w-40 shrink-0">Maneuver Type:</span>
          <span className="text-sm font-medium text-foreground">{loading ? '—' : maneuverData?.recommended_maneuver_type}</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default RiskPanel;