import React, { useState } from "react";

const LEVELS = ["Faible", "Moyen", "Élevé"];

const ExplicitContentLevel: React.FC = () => {
  const [level, setLevel] = useState("Moyen");

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">Niveau de contenu explicite</h2>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full border rounded p-2"
      >
        {LEVELS.map((l, idx) => (
          <option key={idx} value={l}>{l}</option>
        ))}
      </select>
      <p className="text-gray-500 text-sm">
        Ajustez le niveau de contenu explicite visible dans l’application.
      </p>
    </div>
  );
};

export default ExplicitContentLevel;
