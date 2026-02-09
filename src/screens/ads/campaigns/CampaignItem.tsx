import React from "react";

interface Props {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
  impressions: number;
  clicks: number;
  onSelect: (id: string) => void;
}

const CampaignItem: React.FC<Props> = ({
  id,
  name,
  status,
  budget,
  impressions,
  clicks,
  onSelect,
}) => {
  const statusColor =
    status === "active"
      ? "text-green-600"
      : status === "paused"
      ? "text-yellow-600"
      : "text-gray-500";

  return (
    <div
      onClick={() => onSelect(id)}
      className="p-4 bg-white rounded shadow cursor-pointer hover:shadow-md transition"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{name}</h2>
        <span className={`font-medium ${statusColor}`}>{status.toUpperCase()}</span>
      </div>
      <div className="text-gray-600 text-sm space-y-1">
        <p>Budget : ${budget}</p>
        <p>Impressions : {impressions}</p>
        <p>Clicks : {clicks}</p>
      </div>
    </div>
  );
};

export default CampaignItem;
