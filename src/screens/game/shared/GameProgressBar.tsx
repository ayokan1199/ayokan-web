import React from "react";

interface Props {
  progress: number; // 0 à 100
  height?: number;
  color?: string;
}

const GameProgressBar: React.FC<Props> = ({ progress, height = 8, color = "bg-green-500" }) => {
  return (
    <div className="w-full bg-gray-200 rounded" style={{ height }}>
      <div
        className={`${color} h-full rounded`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default GameProgressBar;
