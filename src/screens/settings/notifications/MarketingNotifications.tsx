import React, { useState } from "react";

const MarketingNotifications: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="font-semibold mb-2">Notifications marketing</h2>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        Activer les notifications marketing
      </label>
    </div>
  );
};

export default MarketingNotifications;
