import React from "react";
import { Quest } from "./QuestItem";

interface Props {
  quests: Quest[];
}

const QuestRewardSummary: React.FC<Props> = ({ quests }) => {
  const totalEarned = quests
    .filter((q) => q.progress >= q.goal)
    .reduce((sum, q) => sum + q.reward, 0);

  return (
    <div className="bg-black text-white rounded p-4 mt-4">
      <h3 className="font-semibold">Weekly Rewards</h3>
      <p className="text-sm mt-1">
        Earned sparks: <strong>{totalEarned}</strong>
      </p>
    </div>
  );
};

export default QuestRewardSummary;
