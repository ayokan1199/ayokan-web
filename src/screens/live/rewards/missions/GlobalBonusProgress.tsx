import React from "react";

interface Props {
  progress: number; // 0-100
  bonus: number;
}

const GlobalBonusProgress: React.FC<Props> = ({ progress, bonus }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-bold text-lg mb-2">Bonus global</h4>
      <div className="w-full bg-gray-200 h-4 rounded-full mb-2">
        <div
          className="h-4 bg-yellow-400 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-gray-700 font-semibold">Bonus actuel: {bonus} sparks</p>
    </div>
  );
};

export default GlobalBonusProgress;
