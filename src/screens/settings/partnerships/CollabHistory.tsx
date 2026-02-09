import React from "react";

const history = [
  { id: 1, collab: "Campagne Marque A", date: "10 Jan 2026" },
  { id: 2, collab: "Vidéo créateur B", date: "22 Déc 2025" },
];

const CollabHistory: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Historique des collaborations</h2>

      {history.map((item) => (
        <div key={item.id} className="flex justify-between text-sm border-b py-1">
          <span>{item.collab}</span>
          <span className="text-gray-500">{item.date}</span>
        </div>
      ))}
    </div>
  );
};

export default CollabHistory;
