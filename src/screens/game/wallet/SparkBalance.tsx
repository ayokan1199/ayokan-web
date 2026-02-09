import React from "react";

interface Props {
  balance: number;
}

const SparkBalance: React.FC<Props> = ({ balance }) => {
  return (
    <div className="bg-white p-3 rounded shadow mb-4 flex justify-between items-center">
      <span>Étincelles disponibles</span>
      <span className="font-bold">{balance}</span>
    </div>
  );
};

export default SparkBalance;
