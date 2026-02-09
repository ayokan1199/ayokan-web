import React from "react";
import SparkIcon from "../shared/SparkIcon";

interface Props {
  balance: number;
}

const SparkBalance: React.FC<Props> = ({ balance }) => {
  return (
    <div className="flex items-center bg-yellow-50 border border-yellow-300 rounded p-3 space-x-2">
      <SparkIcon className="text-yellow-400 text-3xl" />
      <div>
        <span className="font-bold text-lg">{balance}</span>
        <span className="text-gray-600 ml-1">Étincelles</span>
      </div>
    </div>
  );
};

export default SparkBalance;
