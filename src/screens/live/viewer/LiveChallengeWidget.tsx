import React from "react";
import LiveProgressBar from "../shared/LiveProgressBar";

interface Challenge {
  id: string;
  name: string;
  progress: number; // 0-100
  reward: string;
}

interface Props {
  challenge: Challenge;
}

const LiveChallengeWidget: React.FC<Props> = ({ challenge }) => {
  return (
    <div className="absolute top-20 right-4 w-64 bg-white bg-opacity-90 rounded shadow p-2 text-sm">
      <h4 className="font-semibold">{challenge.name}</h4>
      <p className="text-gray-600 text-xs mb-1">{challenge.reward}</p>
      <LiveProgressBar progress={challenge.progress} color="bg-pink-500" />
    </div>
  );
};

export default LiveChallengeWidget;
