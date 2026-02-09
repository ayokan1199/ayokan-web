import React from "react";
import ChallengeItem from "./ChallengeItem";

const weeklyChallenges = [
  { id: "w1", name: "Jouer 5 parties", progress: 40, reward: "200 Sparks" },
  { id: "w2", name: "Gagner 3 parties d’affilée", progress: 10, reward: "Avatar exclusif" },
];

const WeeklyGameChallenges: React.FC = () => {
  return (
    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2">Défis hebdomadaires</h3>
      {weeklyChallenges.map(ch => (
        <ChallengeItem key={ch.id} challenge={ch} />
      ))}
    </div>
  );
};

export default WeeklyGameChallenges;
