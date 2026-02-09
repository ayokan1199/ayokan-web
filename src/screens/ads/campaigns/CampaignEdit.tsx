import React, { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  budget: number;
}

interface Props {
  campaign: Campaign;
  onSave?: (updatedCampaign: Campaign) => void;
}

const CampaignEdit: React.FC<Props> = ({ campaign, onSave }) => {
  const [name, setName] = useState(campaign.name);
  const [budget, setBudget] = useState(campaign.budget);
  const [status, setStatus] = useState<Campaign["status"]>(campaign.status);

  const handleSave = () => {
    const updatedCampaign: Campaign = { ...campaign, name, budget, status };
    if (onSave) onSave(updatedCampaign);
    alert(`Campagne "${name}" sauvegardée avec succès !`);
  };

  return (
    <div className="p-6 space-y-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Modifier la campagne</h1>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Nom de la campagne</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Budget (€)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="border rounded p-2"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Statut</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Campaign["status"])}
          className="border rounded p-2"
        >
          <option value="active">Active</option>
          <option value="paused">Pause</option>
          <option value="completed">Terminée</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sauvegarder les modifications
      </button>
    </div>
  );
};

export default CampaignEdit;
