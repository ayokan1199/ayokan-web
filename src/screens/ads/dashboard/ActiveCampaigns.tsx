import React from "react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused";
  budget: string;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "Promo Été",
    status: "active",
    budget: "€20/jour",
  },
  {
    id: "2",
    name: "Boost Produit X",
    status: "paused",
    budget: "€10/jour",
  },
];

const ActiveCampaigns: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold text-lg mb-3">Campagnes actives</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500">Aucune campagne en cours</p>
      ) : (
        <ul className="space-y-2">
          {campaigns.map((campaign) => (
            <li
              key={campaign.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{campaign.name}</p>
                <p className="text-sm text-gray-500">
                  Budget : {campaign.budget}
                </p>
              </div>

              <span
                className={`text-sm font-semibold ${
                  campaign.status === "active"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {campaign.status === "active" ? "Active" : "En pause"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveCampaigns;
