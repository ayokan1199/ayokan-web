import React from "react";
import QuestProgress from "./QuestProgress";

export interface Quest {
  id: string;
  title: string;
  progress: number;
  goal: number;
  reward: number;
}

interface Props {
  quest: Quest;
}

const QuestItem: React.FC<Props> = ({ quest }) => {
  const completed = quest.progress >= quest.goal;

  return (
    <div className="bg-white rounded shadow p-3">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{quest.title}</span>
        <span className="text-sm text-gray-500">
          {quest.reward} sparks
        </span>
      </div>

      <QuestProgress progress={quest.progress} goal={quest.goal} />

      {completed && (
        <div className="text-green-600 text-sm mt-1">
          Quest completed 🎉
        </div>
      )}
    </div>
  );
};

export default QuestItem;
