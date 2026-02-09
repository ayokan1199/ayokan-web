import React, { useState } from "react";
import DailyBudgetSelector from "./DailyBudgetSelector";
import CampaignDuration from "./CampaignDuration";
import BudgetEstimation from "./BudgetEstimation";
import BudgetTips from "./BudgetTips";

export interface BudgetData {
  dailyBudget: number;
  durationDays: number;
}

const BudgetScreen: React.FC = () => {
  const [budget, setBudget] = useState<BudgetData>({
    dailyBudget: 10,
    durationDays: 7,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Budget & Durée</h1>

      <DailyBudgetSelector
        value={budget.dailyBudget}
        onChange={(dailyBudget) =>
          setBudget({ ...budget, dailyBudget })
        }
      />

      <CampaignDuration
        value={budget.durationDays}
        onChange={(durationDays) =>
          setBudget({ ...budget, durationDays })
        }
      />

      <BudgetEstimation budget={budget} />

      <BudgetTips />
    </div>
  );
};

export default BudgetScreen;
