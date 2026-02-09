import React from "react";

const history = [
  { id: "h1", item: "Avatar premium", cost: 200 },
  { id: "h2", item: "Étoile bonus", cost: 50 },
];

const SpendHistory: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Historique des dépenses</h3>
      <ul>
        {history.map(h => (
          <li key={h.id} className="flex justify-between">
            <span>{h.item}</span>
            <span>{h.cost} Sparks</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpendHistory;
