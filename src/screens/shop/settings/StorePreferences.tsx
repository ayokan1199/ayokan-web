import React, { useState } from "react";

const StorePreferences: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoPublish, setAutoPublish] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Préférences de la boutique</h2>
      <div className="flex items-center justify-between">
        <span>Notifications nouvelles commandes</span>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Publier automatiquement nouveaux produits</span>
        <input
          type="checkbox"
          checked={autoPublish}
          onChange={() => setAutoPublish(!autoPublish)}
        />
      </div>
    </div>
  );
};

export default StorePreferences;
