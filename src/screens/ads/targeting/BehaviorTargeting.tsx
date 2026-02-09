import React from "react";

interface Props {
  value: string[];
  onChange: (behaviors: string[]) => void;
}

const BEHAVIORS = [
  "Acheteurs actifs",
  "Utilisateurs mobiles",
  "Fans de créateurs",
  "Acheteurs en ligne",
];

const BehaviorTargeting: React.FC<Props> = ({ value, onChange }) => {
  const toggle = (behavior: string) => {
    onChange(
      value.includes(behavior)
        ? value.filter((b) => b !== behavior)
        : [...value, behavior]
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Comportements</h2>

      <div className="flex flex-wrap gap-2">
        {BEHAVIORS.map((b) => (
          <button
            key={b}
            onClick={() => toggle(b)}
            className={`px-3 py-1 rounded border ${
              value.includes(b)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BehaviorTargeting;
