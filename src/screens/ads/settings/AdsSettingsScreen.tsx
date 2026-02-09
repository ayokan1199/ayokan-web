import React from "react";
import AdsAccountStatus from "./AdsAccountStatus";
import SpendingLimits from "./SpendingLimits";
import NotificationsSettings from "./NotificationsSettings";
import ComplianceStatus from "./ComplianceStatus";

const AdsSettingsScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Paramètres Ads</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Statut du compte</h2>
        <AdsAccountStatus />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Limites de dépenses</h2>
        <SpendingLimits />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <NotificationsSettings />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Conformité & régulations</h2>
        <ComplianceStatus />
      </section>
    </div>
  );
};

export default AdsSettingsScreen;
