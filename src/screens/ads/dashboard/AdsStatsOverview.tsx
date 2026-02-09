import React from "react";

interface Stat {
  label: string;
  value: string;
  change?: string;
}

const stats: Stat[] = [
  { label: "Dépenses", value: "€1,240", change: "+12%" },
  { label: "Impressions", value: "48,200", change: "+8%" },
  { label: "Clics", value: "1,320", change: "+5%" },
  { label: "Conversions", value: "96", change: "+3%" },
];

const AdsStatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded shadow p-4"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
          {stat.change && (
            <p className="text-sm text-green-600">{stat.change}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdsStatsOverview;
