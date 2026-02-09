import React from "react";
import TournamentCard from "./TournamentCard";

const tournaments = [
  { id: "t1", name: "Tournoi de Janvier", reward: "500 Sparks", participants: 50 },
  { id: "t2", name: "Championnat hebdo", reward: "Badge VIP", participants: 30 },
];

const TournamentScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-bold mb-4">Tournois</h2>
      <div className="space-y-3">
        {tournaments.map(t => (
          <TournamentCard key={t.id} tournament={t} />
        ))}
      </div>
    </div>
  );
};

export default TournamentScreen;
