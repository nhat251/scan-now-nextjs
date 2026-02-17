import type { IconProps } from "@/types/commons";

interface LogoProps extends IconProps {
  bgColor?: string;
}

export const Logo = ({
  width = "40px",
  height = "40px",
  bgColor = "var(--logo-background)",
  ...otherProps
}: LogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
    width={width}
    height={height}
    {...otherProps}
  >
    <defs>
      <linearGradient id="logo-layer1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="logo-layer2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
      <linearGradient id="logo-layer3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#f0abfc" />
      </linearGradient>
      <linearGradient id="logo-flame" x1="50%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>

    {/* Background rounded square */}
    <rect x="0" y="0" width="64" height="64" rx="12" fill={bgColor} />

    {/* Cake layers (scaled down ~80%, centered) */}
    <rect x="14" y="44" width="36" height="11" rx="2.5" fill="url(#logo-layer1)" />
    <rect x="17" y="34" width="30" height="11" rx="2.5" fill="url(#logo-layer2)" />
    <rect x="20" y="26" width="24" height="9" rx="2" fill="url(#logo-layer3)" />

    {/* Candle */}
    <rect x="29.5" y="18" width="5" height="8" rx="1" fill="#fef3c7" />

    {/* Flame */}
    <ellipse cx="32" cy="15.5" rx="2.5" ry="3.5" fill="url(#logo-flame)" />

    {/* Code brackets */}
    <text
      x="19"
      y="52"
      fontFamily="monospace"
      fontSize="8"
      fontWeight="bold"
      fill="#e0e7ff"
      opacity="0.5"
    >
      {"</>"}
    </text>
    <text
      x="37"
      y="52"
      fontFamily="monospace"
      fontSize="8"
      fontWeight="bold"
      fill="#e0e7ff"
      opacity="0.5"
    >
      {"{ }"}
    </text>
  </svg>
);
