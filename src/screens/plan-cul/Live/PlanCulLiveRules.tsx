import React from "react";

const rules = [
  "Respect du consentement obligatoire",
  "Pas de contenu illégal",
  "Pas de harcèlement",
  "Interdit aux moins de 18 ans",
];

const PlanCulLiveRules: React.FC = () => {
  return (
    <div className="p-4 max-w-2xl mx-auto bg-yellow-50 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Règles du Live</h2>
      <ul className="list-disc list-inside">
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCulLiveRules;
