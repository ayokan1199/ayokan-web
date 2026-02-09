import React, { useState } from "react";

interface Props {
  tabs: string[];
  onTabChange?: (tab: string) => void;
}

const MissionsTabs: React.FC<Props> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex border-b border-gray-300 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 font-semibold ${
            activeTab === tab ? "border-b-2 border-pink-500 text-pink-500" : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default MissionsTabs;
