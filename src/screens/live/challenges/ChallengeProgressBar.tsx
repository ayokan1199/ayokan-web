import React from "react";

interface Props {
  progress: number; // 0-100
  color?: string;
  height?: number;
}

const ChallengeProgressBar: React.FC<Props> = ({ progress, color = "bg-pink-500", height = 10 }) => {
  return (
    <div className="w-full bg-gray-200 rounded" style={{ height }}>
      <div
        className={`${color} h-full rounded`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ChallengeProgressBar;
