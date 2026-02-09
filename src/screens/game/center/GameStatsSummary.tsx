import React from "react";

const GameStatsSummary: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between">
      <div className="text-center">
        <p className="font-bold">120</p>
        <p className="text-gray-500 text-sm">Parties jouées</p>
      </div>
      <div className="text-center">
        <p className="font-bold">500</p>
        <p className="text-gray-500 text-sm">Points gagnés</p>
      </div>
      <div className="text-center">
        <p className="font-bold">15</p>
        <p className="text-gray-500 text-sm">Défis actifs</p>
      </div>
    </div>
  );
};

export default GameStatsSummary;
