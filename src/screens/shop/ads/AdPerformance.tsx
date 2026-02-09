import React from "react";

const stats = {
  impressions: 1200,
  clicks: 150,
  conversions: 20,
};

const AdPerformance: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Performance des annonces</h3>
      <ul className="space-y-1 text-gray-700">
        <li>Impressions : {stats.impressions}</li>
        <li>Clics : {stats.clicks}</li>
        <li>Conversions : {stats.conversions}</li>
      </ul>
    </div>
  );
};

export default AdPerformance;
