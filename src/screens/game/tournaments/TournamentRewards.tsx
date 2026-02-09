import React from "react";

interface Props {
  rewards: string[];
}

const TournamentRewards: React.FC<Props> = ({ rewards }) => {
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Récompenses</h3>
      <ul className="list-disc list-inside">
        {rewards.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentRewards;
