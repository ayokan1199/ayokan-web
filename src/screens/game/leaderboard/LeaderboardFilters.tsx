import React from "react";

interface Props {
  activeFilter: "Global" | "Friends" | "Match";
  onChange: (filter: "Global" | "Friends" | "Match") => void;
}

const LeaderboardFilters: React.FC<Props> = ({ activeFilter, onChange }) => {
  const filters = ["Global", "Friends", "Match"] as const;

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-2 rounded-full border ${
            activeFilter === f
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default LeaderboardFilters;
