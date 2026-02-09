import React, { useState } from "react";

const REASONS = [
  "Comportement abusif",
  "Contenu explicite non consenti",
  "Spam / Publicité",
  "Autre",
];

const ReportUser: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleReport = () => {
    if (!selectedReason) return alert("Veuillez sélectionner un motif.");
    alert(`Utilisateur signalé pour : ${selectedReason}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Signaler un utilisateur</h2>
      <select
        value={selectedReason}
        onChange={(e) => setSelectedReason(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="">Sélectionnez un motif</option>
        {REASONS.map((r, idx) => (
          <option key={idx} value={r}>{r}</option>
        ))}
      </select>
      <button
        onClick={handleReport}
        className="w-full py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Signaler
      </button>
    </div>
  );
};

export default ReportUser;
