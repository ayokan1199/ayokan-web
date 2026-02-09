import React from "react";

interface Props {
  label: string;
  achieved: boolean;
}

const ChallengeMilestone: React.FC<Props> = ({ label, achieved }) => {
  return (
    <div className={`px-2 py-1 rounded text-sm font-semibold ${achieved ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
      {label}
    </div>
  );
};

export default ChallengeMilestone;
