import React from "react";

const PremiumHistory: React.FC = () => {
  const history = [
    { id: 1, action: "Boost profil activé", date: "2026-01-10" },
    { id: 2, action: "Accès privé activé", date: "2026-01-08" },
    { id: 3, action: "Visibilité augmentée", date: "2026-01-05" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="font-semibold text-lg">Historique Premium</h3>
      <ul className="list-disc list-inside">
        {history.map((item) => (
          <li key={item.id}>
            {item.action} - <span className="text-gray-500">{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumHistory;
