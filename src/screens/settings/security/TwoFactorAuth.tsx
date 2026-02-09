import React, { useState } from "react";

const TwoFactorAuth: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <span>Authentification à deux facteurs</span>
      <input
        type="checkbox"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />
    </div>
  );
};

export default TwoFactorAuth;
