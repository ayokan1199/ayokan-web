import React from "react";

const globalPlayers = [
  { id: "1", name: "Alice", score: 1200 },
  { id: "2", name: "Bob", score: 1150 },
  { id: "3", name: "Charlie", score: 1100 },
];

const GlobalRanking: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Classement mondial</h3>
      <ul className="space-y-1">
        {globalPlayers.map((p, index) => (
          <li key={p.id} className="flex justify-between">
            <span>{index + 1}. {p.name}</span>
            <span>{p.score} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalRanking;
