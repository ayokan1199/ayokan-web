import React from "react";

interface Props {
  onClaimAll: () => void;
  disabled?: boolean;
}

const ClaimAllButton: React.FC<Props> = ({ onClaimAll, disabled = false }) => {
  return (
    <button
      onClick={onClaimAll}
      disabled={disabled}
      className={`px-4 py-2 rounded shadow text-white font-bold ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
      }`}
    >
      Réclamer tout
    </button>
  );
};

export default ClaimAllButton;
