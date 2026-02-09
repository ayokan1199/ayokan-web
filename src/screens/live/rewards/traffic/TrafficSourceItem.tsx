import React from "react";

interface TrafficSource {
  id: string;
  name: string;
  visits: number;
  percentage: number;
}

interface Props {
  source: TrafficSource;
  totalVisits: number;
}

const TrafficSourceItem: React.FC<Props> = ({ source, totalVisits }) => {
  const percentOfTotal = ((source.visits / totalVisits) * 100).toFixed(1);

  return (
    <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
      <span className="font-semibold">{source.name}</span>
      <span className="text-gray-600">{source.visits} visites ({percentOfTotal}%)</span>
    </div>
  );
};

export default TrafficSourceItem;
