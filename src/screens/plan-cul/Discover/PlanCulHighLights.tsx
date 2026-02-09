import React from "react";

const PlanCulHighlights: React.FC = () => {
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      <div className="bg-pink-100 px-4 py-2 rounded shadow">🔥 Populaire</div>
      <div className="bg-purple-100 px-4 py-2 rounded shadow">💋 Nouveau</div>
      <div className="bg-yellow-100 px-4 py-2 rounded shadow">💎 VIP</div>
    </div>
  );
};

export default PlanCulHighlights;
