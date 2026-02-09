// settings/main/SettingsSearch.tsx
import React from "react";

interface SettingsSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SettingsSearch: React.FC<SettingsSearchProps> = ({
  value,
  onChange,
  placeholder = "Rechercher un paramètre..."
}) => {
  return (
    <div className="w-full mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          p-3
          border
          border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
      />
    </div>
  );
};

export default SettingsSearch;
