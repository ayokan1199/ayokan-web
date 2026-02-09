import React from "react";
import { CampaignObjective } from "./ObjectiveScreen";

interface Props {
  objective: CampaignObjective;
}

const detailsMap: Record<CampaignObjective, string> = {
  traffic:
    "Optimisé pour générer un maximum de visites vers votre lien.",
  engagement:
    "Idéal pour obtenir plus d’interactions sur vos contenus.",
  conversions:
    "Conçu pour déclencher des actions spécifiques des utilisateurs.",
  followers:
    "Augmente la visibilité de votre compte et attire des abonnés.",
  sales:
    "Optimisé pour vendre des produits ou services.",
};

const ObjectiveDetails: React.FC<Props> = ({ objective }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Détails de l’objectif</h2>
      <p className="text-gray-700">{detailsMap[objective]}</p>
    </div>
  );
};

export default ObjectiveDetails;
