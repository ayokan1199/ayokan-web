import React from "react";

interface ExplicitBadgeProps {
  level: "Faible" | "Moyen" | "Élevé";
}

const ExplicitBadge: React.FC<ExplicitBadgeProps> = ({ level }) => {
  const color = {
    Faible: "bg-green-200 text-green-800",
    Moyen: "bg-yellow-200 text-yellow-800",
    Élevé: "bg-red-200 text-red-800",
  }[level];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {level}
    </span>
  );
};

export default ExplicitBadge;
