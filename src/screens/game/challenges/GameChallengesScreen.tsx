import React from "react";
import DailyChallenges from "./DailyChallenges";
import WeeklyGameChallenges from "./WeeklyGameChallenges";

const GameChallengesScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="font-bold text-xl mb-4">Défis</h2>
      <DailyChallenges />
      <WeeklyGameChallenges />
    </div>
  );
};

export default GameChallengesScreen;
