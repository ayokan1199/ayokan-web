import React from "react";
import SparkIcon from "../shared/SparkIcon";

interface Props {
  amount: number;
}

const FreeSparkReward: React.FC<Props> = ({ amount }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-300 rounded p-3 flex items-center space-x-2">
      <SparkIcon className="text-yellow-400 text-2xl" />
      <span className="font-semibold">{amount} Étincelles offertes !</span>
    </div>
  );
};

export default FreeSparkReward;
