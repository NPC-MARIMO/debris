import { useEffect, useMemo, useState } from "react";
import type { Satellite, Debris } from "@/data/mockData";
import GlassCard from "./GlassCard";

interface EncounterDetailsProps {
  satellite: Satellite;
  debris: Debris;
}

const EncounterDetails = ({ satellite, debris }: EncounterDetailsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [fuelNeeded, setFuelNeeded] = useState<number | null>(null);
  const [actionTaken, setActionTaken] = useState(false);

  const details = [
    { label: "Satellite", value: satellite?.satellite_info?.satellite_id ?? "Unknown" },
    { label: "Debris ID", value: debris?.object_name },
    { label: "Current Distance", value: `${debris?.distance_km} km` },
    { label: "Relative Velocity", value: `${debris?.relative_velocity_km_s} km/s` },
    { label: "Time to Impact", value: `${debris?.time_to_approach_hours} hours` },
  ];

  // Suggestion pool
  const suggestionPool = [
    "Perform micro thruster lateral shift",
    "Temporary altitude raise maneuver",
    "Orbital inclination correction",
    "Emergency debris avoidance burn",
    "Reduce velocity and delay intersection",
    "Autonomous AI path correction",
    "Reverse drift compensation maneuver",
    "Short burst vector re-alignment",
  ];

  // Generate 5 random suggestions and pick 1 randomly
  useEffect(() => {
    const shuffled = [...suggestionPool].sort(() => Math.random() - 0.5);
    const five = shuffled.slice(0, 5);
    setSuggestions(five);

    const randomPick = five[Math.floor(Math.random() * five.length)];
    setSelectedSuggestion(randomPick);
  }, []);

  const isHighRisk = debris?.risk_score > 0.7;
  const handleTakeAction = () => {
    const randomFuel = Math.floor(Math.random() * (8 - 3 + 1)) + 3;
    setFuelNeeded(randomFuel);
    setShowModal(true);
  };

  const confirmAction = () => {
    setShowModal(false);
    setActionTaken(true);
  };

  return (
    <>
      <GlassCard title="Encounter Details" variant="alert">
        <div className="space-y-3">
          {details.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="text-destructive text-sm">▸</span>
              <span className="text-muted-foreground text-sm w-32 shrink-0">
                {d.label}:
              </span>
              <span className="text-sm font-medium text-foreground">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Selected Suggestion */}
        {isHighRisk && (<div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-muted-foreground mb-1">Recommended Action</p>
          <p className="text-sm font-semibold">{selectedSuggestion}</p>
        </div>)}

        {/* Action Button */}
        <button
          disabled={!isHighRisk}
          onClick={handleTakeAction}
          className={`mt-4 w-full py-2 rounded-xl text-sm font-semibold transition
          ${isHighRisk
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gray-500/40 text-gray-400 cursor-not-allowed"
            }`}
        >
          Take Action
        </button>

        {/* Result */}
        {actionTaken && (
          <div className="mt-4 text-green-400 text-sm font-semibold">
            Actions taken. Collision prevented.
          </div>
        )}
      </GlassCard>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-[320px]">
            <h3 className="text-lg font-semibold mb-3">Fuel Requirement</h3>
            <p className="text-sm text-muted-foreground">
              Extra fuel required:{" "}
              <span className="text-white font-bold">{fuelNeeded}</span> units
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={confirmAction}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EncounterDetails;
