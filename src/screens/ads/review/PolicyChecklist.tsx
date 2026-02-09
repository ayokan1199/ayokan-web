import React, { useState } from "react";

const policies = [
  "Le contenu respecte les règles publicitaires",
  "Aucun contenu trompeur",
  "Aucune incitation interdite",
  "Respect des règles +18 si applicable",
];

const PolicyChecklist: React.FC = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (item: string) => {
    setChecked((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold">Checklist de conformité</h2>

      {policies.map((policy) => (
        <label key={policy} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked.includes(policy)}
            onChange={() => toggle(policy)}
          />
          <span className="text-sm">{policy}</span>
        </label>
      ))}
    </div>
  );
};

export default PolicyChecklist;
