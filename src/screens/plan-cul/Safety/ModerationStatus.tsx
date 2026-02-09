import React from "react";

const MOCK_STATUS = [
  { type: "Compte restreint", date: "2026-01-12", reason: "Contenu inapproprié" },
  { type: "Aucune infraction", date: "", reason: "" },
];

const ModerationStatus: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Statut de modération</h2>
      <ul className="space-y-1">
        {MOCK_STATUS.map((s, idx) => (
          <li key={idx} className="text-gray-700">
            {s.type}
            {s.date && ` - ${s.date}`} {s.reason && `(${s.reason})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModerationStatus;
