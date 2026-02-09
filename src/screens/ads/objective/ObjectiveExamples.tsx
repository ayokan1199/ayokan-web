import React from "react";
import { CampaignObjective } from "./ObjectiveScreen";

interface Props {
  objective: CampaignObjective;
}

const examplesMap: Record<CampaignObjective, string[]> = {
  traffic: [
    "Redirection vers une page produit",
    "Augmenter le trafic d’un site web",
  ],
  engagement: [
    "Booster une vidéo",
    "Augmenter les commentaires",
  ],
  conversions: [
    "Inscription à un service",
    "Téléchargement d’une app",
  ],
  followers: [
    "Promouvoir un profil créateur",
    "Développer une communauté",
  ],
  sales: [
    "Vente flash",
    "Promotion d’un produit",
  ],
};

const ObjectiveExamples: React.FC<Props> = ({ objective }) => {
  return (
    <div className="bg-gray-50 rounded p-4">
      <h2 className="font-semibold mb-2">Exemples d’utilisation</h2>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {examplesMap[objective].map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
    </div>
  );
};

export default ObjectiveExamples;
