import React, { useState } from "react";

interface Props {
  value: string[];
  onChange: (locations: string[]) => void;
}

const LocationTargeting: React.FC<Props> = ({ value, onChange }) => {
  const [input, setInput] = useState("");

  const addLocation = () => {
    if (input && !value.includes(input)) {
      onChange([...value, input]);
      setInput("");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Localisation</h2>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ville ou pays"
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={addLocation}
          className="px-4 bg-blue-600 text-white rounded"
        >
          Ajouter
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {value.map((loc) => (
          <span
            key={loc}
            className="px-3 py-1 bg-gray-200 rounded text-sm"
          >
            {loc}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LocationTargeting;
