import React from "react";

interface Props {
  bonuses: string[];
}

const ChallengeBonusSummary: React.FC<Props> = ({ bonuses }) => {
  return (
    <div className="p-2 bg-white rounded shadow space-y-1 text-sm">
      <h4 className="font-semibold mb-1">Bonus obtenus</h4>
      {bonuses.length === 0 ? (
        <p className="text-gray-500">Aucun bonus pour le moment</p>
      ) : (
        bonuses.map((b, i) => <p key={i}>🎉 {b}</p>)
      )}
    </div>
  );
};

export default ChallengeBonusSummary;
