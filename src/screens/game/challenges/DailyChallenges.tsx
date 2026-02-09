import React from "react";
import ChallengeItem from "./ChallengeItem";

const dailyChallenges = [
  { id: "d1", name: "Gagner 1 partie", progress: 50, reward: "50 Sparks" },
  { id: "d2", name: "Marquer 100 points", progress: 20, reward: "Étoile bonus" },
];

const DailyChallenges: React.FC = () => {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2">Défis quotidiens</h3>
      {dailyChallenges.map(ch => (
        <ChallengeItem key={ch.id} challenge={ch} />
      ))}
    </div>
  );
};

export default DailyChallenges;
