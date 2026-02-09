import React from "react";

const DeviceManagement: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Appareils connectés</h2>
      <p className="text-sm text-gray-500">
        Aucun appareil suspect détecté.
      </p>
      <button className="text-blue-600 text-sm">
        Gérer les appareils
      </button>
    </div>
  );
};

export default DeviceManagement;
