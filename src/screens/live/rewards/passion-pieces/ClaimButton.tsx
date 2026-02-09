import React from "react";

interface Props {
  onClaim: () => void;
  disabled?: boolean;
}

const ClaimButton: React.FC<Props> = ({ onClaim, disabled = false }) => {
  return (
    <button
      onClick={onClaim}
      disabled={disabled}
      className={`px-4 py-2 rounded shadow text-white font-bold ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
      }`}
    >
      Réclamer la récompense
    </button>
  );
};

export default ClaimButton;
