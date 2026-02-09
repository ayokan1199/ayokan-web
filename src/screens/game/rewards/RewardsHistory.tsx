import React from "react";

const history = [
  { id: "h1", reward: "50 Sparks", date: "2026-01-10" },
  { id: "h2", reward: "Avatar exclusif", date: "2026-01-12" },
];

const RewardsHistory: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Historique des récompenses</h3>
      <ul className="space-y-1">
        {history.map(h => (
          <li key={h.id} className="flex justify-between text-gray-700">
            <span>{h.reward}</span>
            <span className="text-sm text-gray-500">{h.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RewardsHistory;
