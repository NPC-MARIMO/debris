import { useEffect, useState } from 'react';
import Header from './Header';
import StarField from './StarField';
import EarthScene from './EarthScene';
import SatelliteDetails from './SatelliteDetails';
import RadarSystem from './RadarSystem';
import DebrisList from './DebrisList';
import EncounterDetails from './EncounterDetails';
import { SafePathViz, CollisionPathViz } from './PathVisualization';
import RiskPanel from './RiskPanel';
import { satellites as mockSatellites, debrisList, type Satellite, type Debris } from '@/data/mockData';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type View = 'satellite' | 'collision';

const Dashboard = () => {
  const baseURL = 'http://127.0.0.1:8000/'
  const [satellites, setSatellites] = useState<Satellite[]>(mockSatellites || []);
  const [view, setView] = useState<View>('satellite');
  const [selectedSatellite, setSelectedSatellite] = useState<Satellite | null>(
    mockSatellites && mockSatellites?.length > 0 ? mockSatellites[0] : null
  );
  const [selectedDebris, setSelectedDebris] = useState<Debris | null>(null);
  const [debrisList, setDebrisList] = useState<Debris[]>([]);

  
  useEffect(() => {
    async function init() {
      try {
        // fetch satellite list
        const satRes = await axios.get(`${baseURL}satellites/tle`);
        // API may return either { satellites: [...] } or an array directly
        const sats: Satellite[] = satRes.data?.satellites ?? satRes.data ?? [];
        setSatellites(sats);
        
        // if we have at least one satellite, fetch its dashboard/details and set as selected
        const firstId = sats?.[0]?.id ?? sats?.[0]?.satellite_name ?? sats?.[0]?.name;

        if (firstId) {
          const detRes = await axios.get(`${baseURL}dashboard/${firstId}/`);
          setSelectedSatellite(detRes.data);
          setDebrisList(detRes.data?.nearby_debris_list ?? []);
        }

        
      } catch (err) {
        console.error('Error initializing satellites:', err);
      }
    }

    init();
  }, []);


  

  const handleSatelliteSelect = async (sat: Satellite) => {
    // optimistically set selected satellite from list
    setSelectedSatellite(sat);
    setView('satellite');

    // then fetch full dashboard/details for this satellite (if backend available)
    try {
      const id = sat?.satellite_name;
      if (id) {
        const detRes = await axios.get(`${baseURL}dashboard/${id}/`);
        console.log(detRes.data,'adsfasdfasfgasuydfgaksgfaskdfgksadgfkhadsgfkadgsfdaj')
        setSelectedSatellite(detRes.data);
        setDebrisList(detRes.data?.nearby_debris_list ?? []);
      }
    } catch (err) {
      console.error('Error fetching satellite details for selection:', err);
    }
  };

  console.log('asdfasfasdf', debrisList)
  console.log('asdfasfmaakabhossdaaaaaagasdf', selectedSatellite)

  const handleDebrisSelect = (debris: Debris) => {
    setSelectedDebris(debris);
    setView('collision');
  };

  const handleBack = () => {
    if (view === 'collision') {
      setView('satellite');
      setSelectedDebris(null);
    }
  };


  // removed redundant SAT_1 polling; initialization handles fetching default satellite

  const satelliteIndex = selectedSatellite
    ? satellites.findIndex(s => s.id === selectedSatellite.id)
    : -1;

  return (
    <div className="min-h-screen relative">
      <StarField />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          onBack={view !== 'satellite' ? handleBack : undefined}
          subtitle={
            view === 'satellite' && selectedSatellite
              ? `Tracking ${selectedSatellite.name}`
              : view === 'collision' && selectedSatellite && selectedDebris
                ? `${selectedSatellite.name} × ${selectedDebris.id} Analysis`
                : undefined
          }
        />

        <main className="flex-1 px-4 pb-4">
          {/* SATELLITE SELECTOR */}

          {/* VIEW 1 — SATELLITE DETAILS */}

          <div className="mb-4 w-[97vw]">
            <Select
              value={selectedSatellite?.id || ''}
              onValueChange={(satId) => {
                const satellite = satellites.find((s) => s.id === satId || s.satellite_id === satId || s.name === satId);
                if (satellite) {
                  handleSatelliteSelect(satellite);
                }
                
              }}
            >
              <SelectTrigger className="w-full text-white ">
                <SelectValue className="text-white" placeholder={selectedSatellite ? selectedSatellite?.satellite_info?.name ?? selectedSatellite?.name ?? selectedSatellite?.id  : 'Select a satellite'} />
              </SelectTrigger>
              <SelectContent className="text-white">
                {satellites.map((sat) => (
                  <>
                  <SelectItem className="text-white" key={sat.id ?? sat.satellite_id ?? sat.name} value={sat.id ?? sat.satellite_id ?? sat.name}>
                    {sat.name ?? sat?.satellite_name ?? sat.id}
                  </SelectItem>
                  </>
                  
                ))}
              </SelectContent>
            </Select>
          </div>
          {view === 'satellite' && selectedSatellite && (
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-4 h-full animate-fade-in">
              <SatelliteDetails satellite={selectedSatellite} />
              <div className="rounded-lg overflow-hidden border border-border/30 min-h-[500px]">
                <EarthScene mode="satellite" highlightedIndex={satelliteIndex} />
              </div>
              <div className="flex flex-col gap-4">
                <RadarSystem />
                <DebrisList debris={debrisList} onSelect={handleDebrisSelect} />
              </div>
            </div>
          )}

          {/* VIEW 2 — COLLISION ANALYSIS */}
          {view === 'collision' && selectedSatellite && selectedDebris && (
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 animate-fade-in">
              <EncounterDetails satellite={selectedSatellite} debris={selectedDebris} />
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SafePathViz />
                  <CollisionPathViz />
                </div>
                <RiskPanel satellite={selectedSatellite} debris={selectedDebris} />
              </div>
              <div></div>
            {/* <div className="rounded-lg overflow-hidden border border-border/30 p-4">
              <h3 className="text-lg font-semibold text-white mb-4">AI Analysis</h3>
              <GoogleGenerativeAI
                satellite={selectedSatellite}
                debris={selectedDebris}
                collisionData={{
                  distance_km: selectedDebris.distance_km,
                  relative_velocity_km_s: selectedDebris.relative_velocity_km_s,
                  risk_score: selectedDebris.risk_score,
                  predicted_close_approach_time: selectedDebris.predicted_close_approach_time,
                  time_to_approach_hours: selectedDebris.time_to_approach_hours,
                }}
              />
            </div> */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;