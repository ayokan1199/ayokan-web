import React, { useState } from "react";
import LeaderboardFilters from "./LeaderboardFilters";
import GlobalRanking from "./GlobalRanking";
import FriendsRanking from "./FriendsRanking";
import MatchRanking from "./MatchRanking";

const GameLeaderboardScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"Global" | "Friends" | "Match">("Global");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-bold mb-4">Classement</h2>
      <LeaderboardFilters activeFilter={activeFilter} onChange={setActiveFilter} />

      {activeFilter === "Global" && <GlobalRanking />}
      {activeFilter === "Friends" && <FriendsRanking />}
      {activeFilter === "Match" && <MatchRanking />}
    </div>
  );
};

export default GameLeaderboardScreen;
