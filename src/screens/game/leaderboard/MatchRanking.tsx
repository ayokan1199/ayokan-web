import React from "react";

const matchPlayers = [
  { id: "m1", name: "Charlie", score: 500 },
  { id: "m2", name: "Alice", score: 450 },
  { id: "m3", name: "Bob", score: 400 },
];

const MatchRanking: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Classement par match</h3>
      <ul className="space-y-1">
        {matchPlayers.map((p, index) => (
          <li key={p.id} className="flex justify-between">
            <span>{index + 1}. {p.name}</span>
            <span>{p.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchRanking;
