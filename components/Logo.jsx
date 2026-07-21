export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gold Ring (Top) */}
      <circle cx="50" cy="35" r="20" stroke="var(--gold)" strokeWidth="8" />
      {/* Crimson Ring (Bottom Left) */}
      <circle cx="35" cy="65" r="20" stroke="var(--crimson)" strokeWidth="8" />
      {/* Blue Ring (Bottom Right) */}
      <circle cx="65" cy="65" r="20" stroke="var(--blue)" strokeWidth="8" />
      
      {/* Interlocking overlaps (optional for effect, but basic rings look great) */}
      <path d="M 50 55 A 20 20 0 0 0 65 25" stroke="var(--gold)" strokeWidth="8" strokeLinecap="round" />
      <path d="M 35 45 A 20 20 0 0 0 15 65" stroke="var(--crimson)" strokeWidth="8" strokeLinecap="round" />
      <path d="M 65 45 A 20 20 0 0 1 85 65" stroke="var(--blue)" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}
