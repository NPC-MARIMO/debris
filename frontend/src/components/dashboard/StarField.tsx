import { useMemo } from 'react';

const StarField = () => {
  const starShadows = useMemo(() => {
    const shadows: string[] = [];
    for (let i = 0; i < 300; i++) {
      const x = Math.floor(Math.random() * 2560);
      const y = Math.floor(Math.random() * 1440);
      const opacity = (Math.random() * 0.6 + 0.2).toFixed(2);
      shadows.push(`${x}px ${y}px hsl(210 40% 95% / ${opacity})`);
    }
    return shadows.join(', ');
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      <div
        className="absolute w-px h-px"
        style={{ boxShadow: starShadows }}
      />
      {/* Subtle nebula glow */}
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, hsl(199 89% 48%), transparent)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-[0.02]"
        style={{ background: 'radial-gradient(circle, hsl(142 71% 45%), transparent)' }}
      />
    </div>
  );
};

export default StarField;
