import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const levels = ["Low", "Medium", "High"];

const ExplicitLevelFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block font-semibold mb-1">Niveau explicite</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-2 py-1"
      >
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExplicitLevelFilter;
