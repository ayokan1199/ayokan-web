import React from "react";
import TrafficSourceItem from "./TrafficSourceItem";
import TrafficPieChart from "./TrafficPieChart";
import TrafficDisclaimer from "./TrafficDisclaimer";

interface TrafficSource {
  id: string;
  name: string;
  visits: number;
  percentage: number; // 0-100
}

interface Props {
  sources: TrafficSource[];
}

const TrafficSourcesSection: React.FC<Props> = ({ sources }) => {
  const totalVisits = sources.reduce((acc, s) => acc + s.visits, 0);

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="text-xl font-bold">Sources de trafic</h3>

      <TrafficPieChart sources={sources} />

      <div className="space-y-2">
        {sources.map((source) => (
          <TrafficSourceItem key={source.id} source={source} totalVisits={totalVisits} />
        ))}
      </div>

      <TrafficDisclaimer />
    </div>
  );
};

export default TrafficSourcesSection;
