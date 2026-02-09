import React, { useState } from "react";

const CHECKPOINTS = [
  "Je confirme être majeur (18+).",
  "J’accepte que les interactions soient de nature sexuelle explicite.",
  "Je consens à partager mon contenu avec d’autres utilisateurs consentants.",
  "Je comprends que je peux retirer mon consentement à tout moment.",
];

const ConsentChecklist: React.FC = () => {
  const [checked, setChecked] = useState<boolean[]>(Array(CHECKPOINTS.length).fill(false));

  const toggleCheck = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  return (
    <div className="space-y-3">
      {CHECKPOINTS.map((item, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={checked[index]}
            onChange={() => toggleCheck(index)}
            className="w-4 h-4 accent-pink-500"
          />
          <span className="text-gray-800">{item}</span>
        </label>
      ))}
    </div>
  );
};

export default ConsentChecklist;
