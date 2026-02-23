import GlassCard from './GlassCard';

export const SafePathViz = () => {
  return (
    <GlassCard title="Safe & New Path" variant="highlight">
      <div className="relative w-full aspect-square max-w-[220px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="earthSafe" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(199, 89%, 20%)" stopOpacity="0.8" />
            </radialGradient>
            <filter id="glowGreen">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="28" fill="url(#earthSafe)" stroke="hsl(199, 89%, 48%)" strokeWidth="0.5" strokeOpacity="0.3" />

          {/* Current path (white dashed) */}
          <ellipse cx="100" cy="100" rx="68" ry="38" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 3" transform="rotate(-18, 100, 100)" />

          {/* New safe path (green) */}
          <ellipse cx="100" cy="100" rx="75" ry="42" fill="none" stroke="hsl(142, 71%, 45%)" strokeWidth="1.5" strokeOpacity="0.8" filter="url(#glowGreen)" transform="rotate(-12, 100, 100)" />

          {/* Satellite on new path */}
          <circle cx="168" cy="82" r="3.5" fill="hsl(142, 71%, 45%)">
            <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          </circle>

          <text x="130" y="55" fill="hsl(142, 71%, 45%)" fontSize="8" fontFamily="Space Grotesk, sans-serif" fontWeight="500">New Path</text>
          <text x="130" y="130" fill="white" fontSize="8" fontFamily="Space Grotesk, sans-serif" opacity="0.5">Current Path</text>
        </svg>
      </div>
    </GlassCard>
  );
};

export const CollisionPathViz = () => {
  return (
    <GlassCard title="Collision Path" variant="alert">
      <div className="relative w-full aspect-square max-w-[220px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="earthCol" cx="50%" cy="50%">
              <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(199, 89%, 20%)" stopOpacity="0.8" />
            </radialGradient>
            <filter id="glowRed">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="28" fill="url(#earthCol)" stroke="hsl(199, 89%, 48%)" strokeWidth="0.5" strokeOpacity="0.3" />

          {/* Orbit path */}
          <ellipse cx="100" cy="100" rx="68" ry="38" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" transform="rotate(-18, 100, 100)" />

          {/* Collision trajectory (red) */}
          <line x1="35" y1="35" x2="155" y2="78" stroke="hsl(0, 84%, 60%)" strokeWidth="2" filter="url(#glowRed)" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" values="18;0" dur="1s" repeatCount="indefinite" />
          </line>

          {/* Satellite */}
          <circle cx="140" cy="68" r="3.5" fill="hsl(199, 89%, 48%)">
            <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* Debris */}
          <circle cx="55" cy="45" r="3" fill="hsl(0, 84%, 60%)">
            <animate attributeName="opacity" values="1;0.3;1" dur="0.7s" repeatCount="indefinite" />
          </circle>

          {/* Impact flash */}
          <circle cx="97" cy="57" r="5" fill="hsl(38, 92%, 50%)" opacity="0">
            <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="3;10;3" dur="2s" repeatCount="indefinite" />
          </circle>

          <text x="42" y="35" fill="hsl(0, 84%, 60%)" fontSize="8" fontFamily="Space Grotesk, sans-serif" fontWeight="500">Debris</text>
          <text x="105" y="95" fill="hsl(0, 84%, 60%)" fontSize="7" fontFamily="Space Grotesk, sans-serif" opacity="0.8">Collision Course</text>
        </svg>
      </div>
    </GlassCard>
  );
};
