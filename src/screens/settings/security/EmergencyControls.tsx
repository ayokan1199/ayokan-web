import React from "react";

const EmergencyControls: React.FC = () => {
  return (
    <div className="border border-red-300 bg-red-50 rounded-lg p-4 space-y-2">
      <h2 className="font-semibold text-red-600">
        Actions d’urgence
      </h2>

      <button className="text-red-600 text-sm">
        Déconnecter tous les appareils
      </button>
    </div>
  );
};

export default EmergencyControls;
