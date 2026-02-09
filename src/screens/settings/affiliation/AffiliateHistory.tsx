import React from "react";

const history = [
  { id: 1, source: "Abonnement Premium", gain: "+300 ✨" },
  { id: 2, source: "Achat Étincelles", gain: "+120 ✨" },
];

const AffiliateHistory: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Historique des gains</h2>

      {history.map((item) => (
        <div
          key={item.id}
          className="flex justify-between text-sm border-b py-1"
        >
          <span>{item.source}</span>
          <span className="font-medium">{item.gain}</span>
        </div>
      ))}
    </div>
  );
};

export default AffiliateHistory;
