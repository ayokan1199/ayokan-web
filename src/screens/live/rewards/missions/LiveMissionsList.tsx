import React from "react";
import MissionCard from "./MissionCard";

interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  reward: number;
  completed: boolean;
}

interface Props {
  missions: Mission[];
}

const LiveMissionsList: React.FC<Props> = ({ missions }) => {
  return (
    <div className="space-y-3">
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};

export default LiveMissionsList;
