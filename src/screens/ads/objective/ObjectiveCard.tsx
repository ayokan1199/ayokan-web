import React from "react";
import { CampaignObjective } from "./ObjectiveScreen";

interface Props {
  title: string;
  description: string;
  value: CampaignObjective;
  selected: CampaignObjective | null;
  onSelect: (value: CampaignObjective) => void;
}

const ObjectiveCard: React.FC<Props> = ({
  title,
  description,
  value,
  selected,
  onSelect,
}) => {
  const isActive = selected === value;

  return (
    <button
      onClick={() => onSelect(value)}
      className={`p-4 rounded border text-left transition ${
        isActive
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

export default ObjectiveCard;
