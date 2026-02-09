import React from "react";

const AffiliateStats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="border rounded-lg p-3 text-center">
        <p className="text-sm text-gray-500">Inscriptions</p>
        <p className="font-bold text-lg">42</p>
      </div>

      <div className="border rounded-lg p-3 text-center">
        <p className="text-sm text-gray-500">Conversions</p>
        <p className="font-bold text-lg">18</p>
      </div>

      <div className="border rounded-lg p-3 text-center">
        <p className="text-sm text-gray-500">Gains</p>
        <p className="font-bold text-lg">1 250 ✨</p>
      </div>
    </div>
  );
};

export default AffiliateStats;
