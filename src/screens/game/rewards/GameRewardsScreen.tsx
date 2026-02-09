import React from "react";
import RewardCard from "./RewardCard";
import RewardsHistory from "./RewardsHistory";

const rewards = [
  { id: "r1", name: "100 Sparks", unlocked: true },
  { id: "r2", name: "Avatar exclusif", unlocked: false },
  { id: "r3", name: "Badge VIP", unlocked: false },
];

const GameRewardsScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-bold mb-4">Récompenses</h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {rewards.map(r => (
          <RewardCard key={r.id} reward={r} />
        ))}
      </div>

      <RewardsHistory />
    </div>
  );
};

export default GameRewardsScreen;
