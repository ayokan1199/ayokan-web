import React, { useState } from "react";

const LiveNotifications: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="font-semibold mb-2">Notifications en direct</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        Activer les notifications en direct
      </label>
    </div>
  );
};

export default LiveNotifications;
