import React from "react";

interface SparkIconProps {
  count?: number;       // nombre d’icônes à afficher
  size?: number;        // taille en pixels
  className?: string;   // classes Tailwind
}

const SparkIcon: React.FC<SparkIconProps> = ({
  count = 1,
  size = 20,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{ fontSize: size }}
          className="text-yellow-400"
        >
          ✨
        </span>
      ))}
    </div>
  );
};

export default SparkIcon; // ✅ export default
