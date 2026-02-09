import React, { useState } from "react";

const EligibilityRules: React.FC = () => {
  const [minLevel, setMinLevel] = useState(1);
  const [vipOnly, setVipOnly] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg">Règles d’éligibilité</h2>

      <div className="flex items-center justify-between">
        <span>Niveau minimum requis :</span>
        <input
          type="number"
          min={1}
          max={100}
          value={minLevel}
          onChange={(e) => setMinLevel(Number(e.target.value))}
          className="border rounded p-2 w-20"
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Réservé aux VIP</span>
        <input
          type="checkbox"
          checked={vipOnly}
          onChange={() => setVipOnly(!vipOnly)}
          className="h-5 w-5"
        />
      </div>
    </div>
  );
};

export default EligibilityRules;
