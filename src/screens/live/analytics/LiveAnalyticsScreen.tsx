import React from "react";
import LiveStatsOverview from "./LiveStatsOverview";
import LiveTrafficSources from "./LiveTrafficSources";
import LiveCharts28Days from "./LiveCharts28Days";
import LivePerformanceTips from "./LivePerformanceTips";

const mockSources = [
  { name: "Feed", count: 120 },
  { name: "Reels", count: 50 },
  { name: "Share Link", count: 30 },
];

const mockLabels = Array.from({ length: 28 }, (_, i) => `J-${28 - i}`);
const mockData = Array.from({ length: 28 }, () => Math.floor(Math.random() * 200));

const mockTips = [
  "Interagissez avec vos viewers",
  "Envoyez des cadeaux aux spectateurs",
  "Utilisez un titre accrocheur",
];

const LiveAnalyticsScreen: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-4">
      <h2 className="text-lg font-bold">Statistiques LIVE</h2>

      <LiveStatsOverview viewers={120} likes={300} gifts={50} comments={25} />

      <LiveTrafficSources sources={mockSources} />

      <LiveCharts28Days labels={mockLabels} data={mockData} />

      <LivePerformanceTips tips={mockTips} />
    </div>
  );
};

export default LiveAnalyticsScreen;
