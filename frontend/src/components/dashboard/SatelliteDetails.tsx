import type { Satellite } from '@/data/mockData';
import GlassCard from './GlassCard';

interface SatelliteDetailsProps {
  satellite: Satellite;
}

const SatelliteDetails = ({ satellite }: SatelliteDetailsProps) => {
  console.log('SatelliteDetails - satellite:', satellite);
  const details = [
    {
      label: 'Satellite',
      value: satellite?.satellite_info?.satellite_id,
    },
    
  ];

  return (
    <GlassCard title="Satellite Details">
      <div className="space-y-3">
        {details.map(d => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="text-primary text-sm">▸</span>
            <span className="text-muted-foreground text-sm w-24 shrink-0">{d.label}:</span>
            <span className={`text-sm font-medium ${d.color || 'text-foreground'}`}>{d.value}</span>
            
          </div>
          
        ))}
        
      </div>
    </GlassCard>
  );
};

export default SatelliteDetails;
