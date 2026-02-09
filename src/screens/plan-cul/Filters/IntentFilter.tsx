import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const intents = ["Fun", "Casual", "Serious", "Flirt"];

const IntentFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block font-semibold mb-1">Intention</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-2 py-1"
      >
        {intents.map((intent) => (
          <option key={intent} value={intent}>
            {intent}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IntentFilter;
