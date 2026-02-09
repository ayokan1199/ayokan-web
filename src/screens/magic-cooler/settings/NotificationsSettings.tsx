import React, { useState } from "react";

const NotificationsSettings: React.FC = () => {
  const [offersNotifications, setOffersNotifications] = useState(true);
  const [animationAlerts, setAnimationAlerts] = useState(true);

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg">Notifications Glacière</h2>

      <div className="flex items-center justify-between">
        <span>Notifications pour nouvelles offres</span>
        <input
          type="checkbox"
          checked={offersNotifications}
          onChange={() => setOffersNotifications(!offersNotifications)}
          className="h-5 w-5"
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Alertes animation magique</span>
        <input
          type="checkbox"
          checked={animationAlerts}
          onChange={() => setAnimationAlerts(!animationAlerts)}
          className="h-5 w-5"
        />
      </div>
    </div>
  );
};

export default NotificationsSettings;
