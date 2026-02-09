import React from "react";
import SparkIcon from "../shared/SparkIcon";
import FireBadge from "../shared/FireBadge";

interface RewardOverviewItem {
  id: string;
  title: string;
  value: number;
  icon?: React.ReactNode;
}

const overviewItems: RewardOverviewItem[] = [
  { id: "1", title: "Étincelles totales", value: 12500, icon: <SparkIcon /> },
  { id: "2", title: "Récompenses actives", value: 8, icon: <FireBadge /> },
  { id: "3", title: "Points LIVE cette semaine", value: 3400, icon: <SparkIcon /> },
];

const RewardsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {overviewItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 bg-white p-4 rounded shadow"
        >
          <div className="w-12 h-12 flex items-center justify-center text-2xl">
            {item.icon}
          </div>
          <div>
            <p className="font-semibold text-lg">{item.title}</p>
            <p className="text-gray-600 font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RewardsOverview;
