import React from "react";

const history = [
  { id: "1", product: "T-shirt Cool", action: "Boost", date: "2026-01-16" },
  { id: "2", product: "Casquette", action: "Réduction 20%", date: "2026-01-15" },
];

const PromotionHistory: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Historique des promotions</h3>
      <ul className="space-y-1">
        {history.map((item) => (
          <li key={item.id} className="flex justify-between text-gray-700">
            <span>{item.product} - {item.action}</span>
            <span className="text-gray-500 text-sm">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionHistory;
