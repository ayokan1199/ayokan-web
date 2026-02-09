import React, { useState } from "react";
import ChallengeProgressBar from "./ChallengeProgressBar";
import ChallengeMilestone from "./ChallengeMilestone";
import ChallengeBonusSummary from "./ChallengeBonusSummary";

interface Challenge {
  id: string;
  name: string;
  progress: number;
  milestones: { label: string; achieved: boolean }[];
  bonuses: string[];
}

const mockChallenge: Challenge = {
  id: "c1",
  name: "Défi du jour",
  progress: 65,
  milestones: [
    { label: "50 points", achieved: true },
    { label: "100 points", achieved: false },
    { label: "150 points", achieved: false },
  ],
  bonuses: ["100 Sparks"],
};

const LiveChallengeScreen: React.FC = () => {
  const [challenge] = useState(mockChallenge);

  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-4">
      <h2 className="text-lg font-bold">{challenge.name}</h2>

      {/* Barre de progression */}
      <ChallengeProgressBar progress={challenge.progress} />

      {/* Milestones */}
      <div className="flex space-x-2 mt-2">
        {challenge.milestones.map((m) => (
          <ChallengeMilestone key={m.label} label={m.label} achieved={m.achieved} />
        ))}
      </div>

      {/* Bonus */}
      <ChallengeBonusSummary bonuses={challenge.bonuses} />
    </div>
  );
};

export default LiveChallengeScreen;
