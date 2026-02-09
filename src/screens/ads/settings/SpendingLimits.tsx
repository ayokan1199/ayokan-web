import React, { useState } from "react";

const SpendingLimits: React.FC = () => {
  const [dailyLimit, setDailyLimit] = useState<number>(50);
  const [monthlyLimit, setMonthlyLimit] = useState<number>(1000);

  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Limite quotidienne ($)</label>
        <input
          type="number"
          value={dailyLimit}
          onChange={(e) => setDailyLimit(Number(e.target.value))}
          className="border rounded p-2 w-32"
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Limite mensuelle ($)</label>
        <input
          type="number"
          value={monthlyLimit}
          onChange={(e) => setMonthlyLimit(Number(e.target.value))}
          className="border rounded p-2 w-32"
        />
      </div>
    </div>
  );
};

export default SpendingLimits;
