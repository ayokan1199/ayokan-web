import React from "react";

const MOCK_HISTORY = [
  { date: "2026-01-10", action: "Consentement donné", method: "Checklist" },
  { date: "2026-01-12", action: "Consentement retiré", method: "Révocation" },
];

const ConsentHistory: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Historique des consentements</h2>
      {MOCK_HISTORY.length === 0 ? (
        <p className="text-gray-600">Aucun historique disponible.</p>
      ) : (
        <ul className="space-y-2">
          {MOCK_HISTORY.map((item, idx) => (
            <li key={idx} className="border p-2 rounded">
              <span className="font-semibold">{item.date}</span> — {item.action} ({item.method})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConsentHistory;
