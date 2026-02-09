import React from "react";
import MissionProgressBar from "./MissionProgressBar";

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  reward: number;
  completed: boolean;
}

interface Props {
  mission: Mission;
}

const MissionCard: React.FC<Props> = ({ mission }) => {
  return (
    <div
      className={`bg-white p-4 rounded shadow flex flex-col gap-2 ${
        mission.completed ? "opacity-70" : ""
      }`}
    >
      <h4 className="font-semibold text-lg">{mission.title}</h4>
      <p className="text-gray-600">{mission.description}</p>
      <MissionProgressBar progress={mission.progress} />
      <p className="text-sm font-bold text-yellow-500">Récompense: {mission.reward} sparks</p>
      {mission.completed && <span className="text-green-500 font-bold">Complété 🎉</span>}
    </div>
  );
};

export default MissionCard;
