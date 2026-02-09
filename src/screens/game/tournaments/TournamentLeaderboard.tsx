import React from "react";

interface Player {
  id: string;
  name: string;
  score: number;
}

interface Props {
  players: Player[];
}

const TournamentLeaderboard: React.FC<Props> = ({ players }) => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Classement du tournoi</h3>
      <ul>
        {players.map((p, i) => (
          <li key={p.id} className="flex justify-between">
            <span>{i + 1}. {p.name}</span>
            <span>{p.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentLeaderboard;
