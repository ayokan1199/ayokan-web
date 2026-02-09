import React from "react";

interface Props {
  ageRange: [number, number];
  genders: string[];
  onChange: (ageRange: [number, number], genders: string[]) => void;
}

const GENDER_OPTIONS = ["Homme", "Femme", "Autre"];

const AgeGenderTargeting: React.FC<Props> = ({
  ageRange,
  genders,
  onChange,
}) => {
  const toggleGender = (gender: string) => {
    onChange(
      ageRange,
      genders.includes(gender)
        ? genders.filter((g) => g !== gender)
        : [...genders, gender]
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-semibold">Âge & Genre</h2>

      <div className="flex gap-4">
        <input
          type="number"
          value={ageRange[0]}
          min={18}
          onChange={(e) =>
            onChange([Number(e.target.value), ageRange[1]], genders)
          }
          className="border p-2 w-20 rounded"
        />
        <span>à</span>
        <input
          type="number"
          value={ageRange[1]}
          max={99}
          onChange={(e) =>
            onChange([ageRange[0], Number(e.target.value)], genders)
          }
          className="border p-2 w-20 rounded"
        />
      </div>

      <div className="flex gap-2">
        {GENDER_OPTIONS.map((g) => (
          <button
            key={g}
            onClick={() => toggleGender(g)}
            className={`px-3 py-1 rounded border ${
              genders.includes(g)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeGenderTargeting;
