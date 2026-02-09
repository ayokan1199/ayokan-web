import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const DailyBudgetSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold">Budget journalier (€)</h2>

      <input
        type="range"
        min={5}
        max={500}
        step={5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />

      <div className="text-lg font-bold">{value} € / jour</div>
    </div>
  );
};

export default DailyBudgetSelector;
