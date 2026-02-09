import React from "react";
import GameActivityBonus from "./GameActivityBonus";
import LiveActivityBonus from "./LiveActivityBonus";

const sampleGameConditions = [
  { id: "1", description: "Terminer un défi Game", completed: true },
  { id: "2", description: "Score > 500", completed: false },
];

const sampleLiveConditions = [
  { id: "1", description: "Regarder 10 min de LIVE", completed: true },
  { id: "2", description: "Envoyer un cadeau", completed: true },
];

const ActivityBonusScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Bonus liés à votre activité</h1>
      <GameActivityBonus
        gameName="Défis Game"
        conditions={sampleGameConditions}
        onClaim={() => alert("Bonus Game débloqué !")}
      />
      <LiveActivityBonus
        liveName="Sessions LIVE"
        conditions={sampleLiveConditions}
        onClaim={() => alert("Bonus LIVE débloqué !")}
      />
    </div>
  );
};

export default ActivityBonusScreen;
