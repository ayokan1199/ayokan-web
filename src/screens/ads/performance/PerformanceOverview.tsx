import React from "react";

interface Props {
  period: "7d" | "28d" | "90d";
}

const PerformanceOverview: React.FC<Props> = ({ period }) => {
  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold">Résumé des performances ({period})</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="font-bold text-xl">1,250</p>
          <p className="text-gray-500 text-sm">Impressions</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">320</p>
          <p className="text-gray-500 text-sm">Clics</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">12%</p>
          <p className="text-gray-500 text-sm">CTR</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-xl">250 €</p>
          <p className="text-gray-500 text-sm">Dépenses</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
