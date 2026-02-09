import React from "react";

interface ProfileTabsProps {
  activeTab: "Posts" | "Reels" | "LIVE" | "Badges";
  onTabChange: (tab: "Posts" | "Reels" | "LIVE" | "Badges") => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["Posts", "Reels", "LIVE", "Badges"] as const;

  return (
    <div className="flex border-b bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2 text-center font-semibold ${
            activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
