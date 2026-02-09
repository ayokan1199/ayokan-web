import React from "react";
import ChallengeItem, { Challenge } from "./ChallengeItem";

// Défis actifs typés explicitement
const challenges: Challenge[] = [
  { id: "1", name: "Score 500 points", progress: 70, reward: "100 Sparks" },
  { id: "2", name: "Gagner 3 parties", progress: 40, reward: "Badge VIP" },
];

const ActiveChallenges: React.FC = () => {
  return (
    <div className="my-4">
      <h2 className="font-bold text-lg mb-2">Défis actifs</h2>
      <div className="space-y-2">
        {challenges.map((c) => (
          <ChallengeItem key={c.id} challenge={c} />
        ))}
      </div>
    </div>
  );
};

export default ActiveChallenges;
