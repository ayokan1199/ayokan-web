import React from "react";
import MissionCard from "./MissionCard";

const weeklyQuests = [
  { id: "w1", title: "Regarde 5 LIVE", description: "Gagne 200 sparks", progress: 60, reward: 200, completed: false },
  { id: "w2", title: "Envoie 10 cadeaux", description: "Gagne 500 sparks", progress: 20, reward: 500, completed: false },
];

const WeeklyQuestsList: React.FC = () => {
  return <LiveMissionsList missions={weeklyQuests} />;
};

import LiveMissionsList from "./LiveMissionsList";
export default WeeklyQuestsList;
