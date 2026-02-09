import React from "react";
import AdsStatsOverview from "./AdsStatsOverview";
import ActiveCampaigns from "./ActiveCampaigns";
import AdsQuickActions from "./AdsQuickActions";
import AdsTips from "./AdsTips";

const AdsDashboardScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Ads Manager Dashboard</h1>

      <AdsStatsOverview />
      <AdsQuickActions />
      <ActiveCampaigns />
      <AdsTips />
    </div>
  );
};

export default AdsDashboardScreen;
