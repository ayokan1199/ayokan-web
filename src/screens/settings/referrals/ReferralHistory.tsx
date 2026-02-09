import React from "react";

const history = [
  { id: 1, name: "Alex", reward: "+50 ✨" },
  { id: 2, name: "Sarah", reward: "+100 ✨ (LIVE)" },
];

const ReferralHistory: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Historique</h2>

      {history.map((item) => (
        <div
          key={item.id}
          className="flex justify-between text-sm border-b py-1"
        >
          <span>{item.name}</span>
          <span className="font-medium">{item.reward}</span>
        </div>
      ))}
    </div>
  );
};

export default ReferralHistory;
