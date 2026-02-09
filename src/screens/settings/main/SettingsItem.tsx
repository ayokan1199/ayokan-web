import React from "react";

interface SettingsItemProps {
  label: string;
  onClick: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition"
    >
      {label}
    </button>
  );
};

export default SettingsItem;
