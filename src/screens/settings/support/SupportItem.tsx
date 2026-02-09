import React from "react";

interface SupportItemProps {
  label: string;
  onClick: () => void;
}

const SupportItem: React.FC<SupportItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 border rounded-md hover:bg-gray-100 transition-colors"
    >
      {label}
    </button>
  );
};

export default SupportItem;
