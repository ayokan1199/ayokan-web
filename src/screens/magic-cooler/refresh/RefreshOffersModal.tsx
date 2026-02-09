import React, { useState } from "react";
import RefreshConditions from "./RefreshConditions";
import RefreshCooldown from "./RefreshCooldown";
import RefreshConfirmation from "./RefreshConfirmation";

const RefreshOffersModal: React.FC = () => {
  const dailyLimit = 1;
  const [usedRefresh, setUsedRefresh] = useState(0);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRefresh = () => {
    setShowConfirmation(true);
  };

  const confirmRefresh = () => {
    setUsedRefresh((prev) => prev + 1);
    setCooldownSeconds(24 * 60 * 60); // 24h cooldown
    setShowConfirmation(false);
    alert("Offres rafraîchies !");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Rafraîchir les offres</h2>
      <RefreshConditions dailyRefreshLimit={dailyLimit} refreshUsed={usedRefresh} />
      <RefreshCooldown cooldownSeconds={cooldownSeconds} />

      <button
        className="py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
        onClick={handleRefresh}
      >
        Rafraîchir maintenant
      </button>

      {showConfirmation && (
        <RefreshConfirmation
          onConfirm={confirmRefresh}
          onCancel={() => setShowConfirmation(false)}
          costSparks={usedRefresh >= dailyLimit ? 50 : undefined}
        />
      )}
    </div>
  );
};

export default RefreshOffersModal;
