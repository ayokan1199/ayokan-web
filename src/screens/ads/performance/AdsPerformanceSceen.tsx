import React, { useState } from "react";
import PerformanceOverview from "./PerformanceOverview";
import PerformanceCharts from "./PerformanceCharts";
import AudienceInsights from "./AudienceInsights";
import OptimizationTips from "./OptimizationTips";

const AdsPerformanceScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "28d" | "90d">("28d");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Suivi des performances</h1>

      <div className="flex space-x-2">
        <button
          onClick={() => setSelectedPeriod("7d")}
          className={`px-3 py-1 rounded ${
            selectedPeriod === "7d" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          7 jours
        </button>
        <button
          onClick={() => setSelectedPeriod("28d")}
          className={`px-3 py-1 rounded ${
            selectedPeriod === "28d" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          28 jours
        </button>
        <button
          onClick={() => setSelectedPeriod("90d")}
          className={`px-3 py-1 rounded ${
            selectedPeriod === "90d" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          90 jours
        </button>
      </div>

      <PerformanceOverview period={selectedPeriod} />
      <PerformanceCharts period={selectedPeriod} />
      <AudienceInsights />
      <OptimizationTips />
    </div>
  );
};

export default AdsPerformanceScreen;
