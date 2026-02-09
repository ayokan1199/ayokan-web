import React from "react";

const tips = [
  "Jouez quotidiennement pour gagner des Sparks",
  "Participez aux tournois pour des récompenses rares",
  "Débloquez des missions hebdomadaires pour booster votre portefeuille",
];

const WalletTips: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Conseils</h3>
      <ul className="list-disc list-inside text-gray-700">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default WalletTips;
