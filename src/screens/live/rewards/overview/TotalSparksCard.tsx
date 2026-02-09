import React from "react";
import SparkIcon from "../shared/SparkIcon";

const TotalSparksCard: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <SparkIcon className="text-yellow-400 text-4xl mb-2" count={3} size={32} />
      <h3 className="font-bold text-lg">Étincelles totales</h3>
      <p className="text-gray-700 mt-1">12,500 sparks accumulées</p>
    </div>
  );
};

export default TotalSparksCard;
