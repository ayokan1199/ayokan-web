import React from "react";
import { BudgetData } from "./BudgetScreen";

interface Props {
  budget: BudgetData;
}

const BudgetEstimation: React.FC<Props> = ({ budget }) => {
  const total = budget.dailyBudget * budget.durationDays;
  const estimatedReach = Math.round(total * 120);

  return (
    <div className="bg-gray-50 p-4 rounded border space-y-1">
      <h2 className="font-semibold">Estimation</h2>

      <p>💰 Budget total : <strong>{total} €</strong></p>
      <p>👁️ Portée estimée : <strong>{estimatedReach.toLocaleString()}</strong> vues</p>
    </div>
  );
};

export default BudgetEstimation;
