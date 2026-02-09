import React from "react";
import TwoFactorAuth from "./TwoFactorAuth";
import LoginHistory from "./LoginHistory";
import DeviceManagement from "./DeviceManagement";
import EmergencyControls from "./EmergencyControls";

const SecurityScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Sécurité</h1>

      <TwoFactorAuth />
      <DeviceManagement />
      <LoginHistory />
      <EmergencyControls />
    </div>
  );
};

export default SecurityScreen;
