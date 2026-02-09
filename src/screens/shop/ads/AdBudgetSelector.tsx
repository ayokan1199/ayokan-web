import React from "react";

interface Props {
  budget: number;
  setBudget: (value: number) => void;
}

const AdBudgetSelector: React.FC<Props> = ({ budget, setBudget }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="font-semibold">Budget (€):</label>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="border rounded p-1 w-20"
        min={1}
      />
    </div>
  );
};

export default AdBudgetSelector;
