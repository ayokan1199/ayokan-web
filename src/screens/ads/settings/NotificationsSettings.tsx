import React, { useState } from "react";

const NotificationsSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="bg-white shadow rounded p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span>Notifications par email</span>
        <input
          type="checkbox"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Notifications push</span>
        <input
          type="checkbox"
          checked={pushNotifications}
          onChange={() => setPushNotifications(!pushNotifications)}
        />
      </div>
    </div>
  );
};

export default NotificationsSettings;
