import React from "react";

const rewards = [
  "+50 Étincelles par inscription validée",
  "Bonus si l’ami passe en LIVE",
  "Boost visibilité social",
];

const ReferralRewards: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Récompenses</h2>

      <ul className="list-disc list-inside text-sm text-gray-600">
        {rewards.map((reward) => (
          <li key={reward}>{reward}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReferralRewards;
