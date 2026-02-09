import React from "react";
import FeaturedGames from "../catalog/FeaturedGames";
import PlayWithMatchCard from "./PlayWithMatchCard";
import ActiveChallenges from "../challenges/ActiveChallenges";
import GameStatsSummary from "./GameStatsSummary";

const GameCenterScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <GameStatsSummary />
      <FeaturedGames />
      <ActiveChallenges />
      <PlayWithMatchCard />
    </div>
  );
};

export default GameCenterScreen;
