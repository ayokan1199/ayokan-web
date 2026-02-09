import React, { useState } from "react";

const RewardsNotifications: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="font-semibold mb-2">Notifications de récompenses</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        Activer les notifications de récompenses
      </label>
    </div>
  );
};

export default RewardsNotifications;
