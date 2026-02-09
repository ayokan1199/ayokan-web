import React from "react";

const earnedRewards = ["Badge VIP", "Avatar exclusif", "100 Sparks"];

const EarnedRewards: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow mb-4">
      <h3 className="font-semibold mb-2">Récompenses gagnées</h3>
      <ul className="list-disc list-inside">
        {earnedRewards.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default EarnedRewards;
