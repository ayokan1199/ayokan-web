import React from "react";

interface Props {
  dailyRefreshLimit: number;
  refreshUsed: number;
}

const RefreshConditions: React.FC<Props> = ({ dailyRefreshLimit, refreshUsed }) => {
  return (
    <div className="bg-gray-50 p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Conditions de rafraîchissement</h3>
      <p className="text-gray-700">
        Vous avez utilisé {refreshUsed}/{dailyRefreshLimit} rafraîchissements gratuits aujourd'hui.
      </p>
      {refreshUsed >= dailyRefreshLimit && (
        <p className="text-red-600 mt-1">Rafraîchissement supplémentaire payant requis.</p>
      )}
    </div>
  );
};

export default RefreshConditions;
