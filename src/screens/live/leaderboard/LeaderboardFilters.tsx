import React, { useState } from "react";

interface Props {
  filters: string[];
  onSelect?: (filter: string) => void;
}

const LeaderboardFilters: React.FC<Props> = ({ filters, onSelect }) => {
  const [active, setActive] = useState(filters[0] || "");

  const handleClick = (filter: string) => {
    setActive(filter);
    onSelect?.(filter);
  };

  return (
    <div className="flex space-x-2 mb-2">
      {filters.map((f) => (
        <button
          key={f}
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            active === f ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleClick(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default LeaderboardFilters;
