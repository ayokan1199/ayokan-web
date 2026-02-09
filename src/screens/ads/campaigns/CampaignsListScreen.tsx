import React, { useState } from "react";
import CampaignItem from "./CampaignItem";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
  impressions: number;
  clicks: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Promo T-shirt Cool",
    status: "active",
    budget: 500,
    impressions: 1200,
    clicks: 150,
  },
  {
    id: "2",
    name: "Casquette Été",
    status: "paused",
    budget: 300,
    impressions: 800,
    clicks: 50,
  },
  {
    id: "3",
    name: "Lunettes VIP",
    status: "completed",
    budget: 1000,
    impressions: 2000,
    clicks: 300,
  },
];

const CampaignsListScreen: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);

  const handleSelectCampaign = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id);
    if (campaign) {
      alert(`Campagne sélectionnée: ${campaign.name}`);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Mes Campagnes</h1>
      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <CampaignItem
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            status={campaign.status}
            budget={campaign.budget}
            impressions={campaign.impressions}
            clicks={campaign.clicks}
            onSelect={handleSelectCampaign}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignsListScreen;
