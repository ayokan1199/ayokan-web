import React from "react";
import LiveMissionsList from "./LiveMissionsList";

const seasonalMissions = [
  { id: "s1", title: "Top Fan du mois", description: "Gagne 1000 sparks", progress: 50, reward: 1000, completed: false },
  { id: "s2", title: "Participation LIVE", description: "Assiste à 20 LIVE", progress: 30, reward: 800, completed: false },
];

const SeasonalMissionsList: React.FC = () => {
  return <LiveMissionsList missions={seasonalMissions} />;
};

export default SeasonalMissionsList;
