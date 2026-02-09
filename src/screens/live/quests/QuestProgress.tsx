import React from "react";

interface Props {
  progress: number;
  goal: number;
}

const QuestProgress: React.FC<Props> = ({ progress, goal }) => {
  const percentage = Math.min((progress / goal) * 100, 100);

  return (
    <div className="mt-2">
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-pink-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-xs text-gray-500 mt-1">
        {progress} / {goal}
      </div>
    </div>
  );
};

export default QuestProgress;
