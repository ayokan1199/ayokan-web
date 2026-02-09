import React from "react";
import LiveNotifications from "./LiveNotifications";
import RewardsNotifications from "./RewardsNotifications";
import MarketingNotifications from "./MarketingNotifications";

const NotificationSettingsScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <LiveNotifications />
      <RewardsNotifications />
      <MarketingNotifications />
    </div>
  );
};

export default NotificationSettingsScreen;
