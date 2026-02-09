import React from "react";

interface Props {
  progress: number; // 0-100
  color?: string;
}

const PassionPuzzleProgress: React.FC<Props> = ({ progress, color = "bg-purple-500" }) => {
  return (
    <div className="w-full bg-gray-200 rounded h-4">
      <div className={`${color} h-full rounded`} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default PassionPuzzleProgress;
