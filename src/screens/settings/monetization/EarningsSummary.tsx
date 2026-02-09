import React from "react";

const EarningsSummary: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold">Gains</h2>

      <div className="flex justify-between">
        <span className="text-gray-500">Total gagné</span>
        <span className="font-bold">3 480 ✨</span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">Ce mois-ci</span>
        <span className="font-bold">420 ✨</span>
      </div>

      <button className="text-blue-600 text-sm">
        Voir le détail
      </button>
    </div>
  );
};

export default EarningsSummary;
