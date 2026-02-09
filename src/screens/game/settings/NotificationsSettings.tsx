import React, { useState } from "react";

const NotificationsSettings: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <span>Notifications</span>
      <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
    </div>
  );
};

export default NotificationsSettings;
