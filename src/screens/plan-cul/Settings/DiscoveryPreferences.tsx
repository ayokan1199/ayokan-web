import React, { useState } from "react";

const DiscoveryPreferences: React.FC = () => {
  const [showNearby, setShowNearby] = useState(true);
  const [showAdults, setShowAdults] = useState(true);

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">Préférences de découverte</h2>
      
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showNearby}
          onChange={() => setShowNearby(!showNearby)}
        />
        <span>Afficher les utilisateurs proches</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showAdults}
          onChange={() => setShowAdults(!showAdults)}
        />
        <span>Afficher uniquement profils +18</span>
      </label>
    </div>
  );
};

export default DiscoveryPreferences;
