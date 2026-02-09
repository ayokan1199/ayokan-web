import React from "react";

interface Props {
  value: string[];
  onChange: (interests: string[]) => void;
}

const INTERESTS = [
  "Mode",
  "Sport",
  "Gaming",
  "Musique",
  "Voyage",
  "Tech",
];

const InterestTargeting: React.FC<Props> = ({ value, onChange }) => {
  const toggle = (interest: string) => {
    onChange(
      value.includes(interest)
        ? value.filter((i) => i !== interest)
        : [...value, interest]
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Centres d’intérêt</h2>

      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => (
          <button
            key={interest}
            onClick={() => toggle(interest)}
            className={`px-3 py-1 rounded border ${
              value.includes(interest)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {interest}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterestTargeting;
