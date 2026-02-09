import React from "react";

interface AvailabilityBadgeProps {
  available: boolean;
}

const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ available }) => {
  const color = available ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-600";
  const text = available ? "Disponible" : "Indisponible";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
      {text}
    </span>
  );
};

export default AvailabilityBadge;
