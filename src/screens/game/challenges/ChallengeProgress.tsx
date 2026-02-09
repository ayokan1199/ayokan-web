import React from "react";

interface Props {
  progress: number;
}

const ChallengeProgress: React.FC<Props> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-3 rounded">
      <div
        className="bg-green-500 h-3 rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ChallengeProgress;
