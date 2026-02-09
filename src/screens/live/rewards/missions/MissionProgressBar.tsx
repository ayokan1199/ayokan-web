import React from "react";

interface Props {
  progress: number; // 0-100
}

const MissionProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full mt-1">
      <div
        className="h-3 rounded-full bg-pink-500 transition-all duration-300"
        style={{ width: `${Math.min(progress, 100)}%` }}
      ></div>
    </div>
  );
};

export default MissionProgressBar;
