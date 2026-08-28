export const ATMOSPHERE_BG = 'bg-gradient-to-b from-[#1a3170] via-[#14245c] to-[#0e1a44]';

/** Faint horizon rows + a warm glow, echoing the hero photo behind full-bleed navy banners. */
export function AtmosphereLayers() {
  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(100deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 26px)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          maskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '14%',
          right: '10%',
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, rgba(240,162,62,0.28) 0%, rgba(240,162,62,0) 70%)',
        }}
      />
    </>
  );
}
