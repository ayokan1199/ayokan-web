import React from "react";

interface Props {
  available: boolean;
}

const AvailabilityStatus: React.FC<Props> = ({ available }) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-semibold ${
        available ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
      }`}
    >
      {available ? "Disponible" : "Indisponible"}
    </span>
  );
};

export default AvailabilityStatus;
