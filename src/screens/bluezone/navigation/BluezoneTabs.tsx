// screens/bluezone/navigation/BluezoneTabs.tsx
import React, { useState } from "react";
import BluezoneHomeScreen from "../home/BluezoneHomeScreen";
import ReelsScreen from "../reels/ReelsScreen";
import BluezoneLiveScreen from "../live/BluezoneLiveScreen";
import ChatList from "../chat/ChatList";
import BluezoneProfileScreen from "../profile/BluezoneProfileScreen";

type Tab = "Home" | "Reels" | "Live" | "Messages" | "Profile";

const BluezoneTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <BluezoneHomeScreen />;
      case "Reels":
        return <ReelsScreen />;
      case "Live":
        return <BluezoneLiveScreen />;
      case "Messages":
        return <ChatList />;
      case "Profile":
        return <BluezoneProfileScreen />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenu principal */}
      <div className="flex-1">{renderScreen()}</div>

      {/* Tabs */}
      <div className="flex justify-around bg-gray-200 p-3 border-t">
        {(["Home", "Reels", "Live", "Messages", "Profile"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded ${
              activeTab === tab ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BluezoneTabs;
