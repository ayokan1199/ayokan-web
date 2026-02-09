import React, { useState } from "react";
import RewardsOverview from "./overview/RewardsOverview";
import SparkEarningsCard from "./overview/SparkEarningsCard";
import TotalSparksCard from "./overview/TotalSparksCard";
import LiveStatsChart28Days from "./overview/LiveStatsChart28Days";
import ViewAllHistoryButton from "./overview/ViewAllHistoryButton";

const LiveRewardsScreen: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center">LIVE Rewards</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SparkEarningsCard />
        <TotalSparksCard />
        <LiveStatsChart28Days />
      </div>

      {/* Overview Section */}
      <RewardsOverview />

      {/* Show history button */}
      <div className="text-center">
        <ViewAllHistoryButton onClick={() => setShowHistory(!showHistory)} />
      </div>

      {/* History Overlay */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-2/3 h-3/4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Rewards History</h2>
            <p className="text-gray-600">
              Ici tu peux voir toutes les récompenses débloquées et les sparks gagnés.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveRewardsScreen;
