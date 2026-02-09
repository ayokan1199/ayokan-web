import React from "react";

interface Props {
  onActivate: () => void;
  disabled?: boolean;
}

const OfferCTA: React.FC<Props> = ({ onActivate, disabled = false }) => {
  return (
    <button
      onClick={onActivate}
      disabled={disabled}
      className={`px-4 py-2 rounded font-semibold ${
        disabled ? "bg-gray-300 text-gray-600" : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
    >
      Activer
    </button>
  );
};

export default OfferCTA;
