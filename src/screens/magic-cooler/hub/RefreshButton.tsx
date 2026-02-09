import React from "react";

interface Props {
  onRefresh: () => void;
  disabled?: boolean;
}

const RefreshButton: React.FC<Props> = ({ onRefresh, disabled = false }) => {
  return (
    <button
      onClick={onRefresh}
      disabled={disabled}
      className={`px-4 py-2 rounded font-semibold ${
        disabled ? "bg-gray-300 text-gray-600" : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      Rafraîchir offres
    </button>
  );
};

export default RefreshButton;
