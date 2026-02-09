import React from "react";

const EarningsOverview: React.FC = () => {
  const earnings = 1250; // exemple de données

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h2 className="font-semibold text-lg mb-2">Gains totaux</h2>
      <p className="text-gray-700 text-xl">{earnings} €</p>
    </div>
  );
};

export default EarningsOverview;
