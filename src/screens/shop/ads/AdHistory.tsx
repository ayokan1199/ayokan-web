import React from "react";

const history = [
  { id: "1", product: "T-shirt Cool", budget: 20, date: "2026-01-16" },
  { id: "2", product: "Casquette", budget: 15, date: "2026-01-15" },
];

const AdHistory: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Historique des annonces</h3>
      <ul className="space-y-1 text-gray-700">
        {history.map((ad) => (
          <li key={ad.id} className="flex justify-between">
            <span>{ad.product} - {ad.budget}€</span>
            <span className="text-gray-500 text-sm">{ad.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdHistory;
