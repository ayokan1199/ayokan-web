import React from "react";
import ChallengeProgress from "./ChallengeProgress";

// Type Challenge centralisé (tu peux le déplacer dans game.types.ts si tu veux)
export interface Challenge {
  id: string;
  name: string;
  progress: number; // 0-100
  reward: string;
}

interface Props {
  challenge: Challenge;
}

const ChallengeItem: React.FC<Props> = ({ challenge }) => {
  return (
    <div className="bg-white p-3 rounded shadow mb-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{challenge.name}</h3>
        <span className="text-sm text-gray-500">{challenge.reward}</span>
      </div>
      <ChallengeProgress progress={challenge.progress} />
    </div>
  );
};

export default ChallengeItem;
