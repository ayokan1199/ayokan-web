import React from "react";
import MagicOfferCard from "./MagicOfferCard";
import OfferConditions from "./OfferConditions";
import OfferValidity from "./OfferValidity";

const sampleOffer = {
  id: "1",
  title: "Boost Visibilité Gold",
  description: "Augmente la visibilité de vos offres de manière significative",
  cost: 300,
  validity: "24h",
  conditions: ["LIVE ≥ 10 min", "Défi Game complété", "Achats précédents"],
};

const OfferDetailScreen: React.FC = () => {
  const handleActivate = () => {
    alert(`Offre "${sampleOffer.title}" activée !`);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">{sampleOffer.title}</h1>
      <MagicOfferCard
        id={sampleOffer.id}
        title={sampleOffer.title}
        description={sampleOffer.description}
        cost={sampleOffer.cost}
        validity={sampleOffer.validity}
        onActivate={handleActivate}
      />
      <OfferValidity validity={sampleOffer.validity} />
      <h2 className="font-semibold text-lg">Conditions</h2>
      <OfferConditions conditions={sampleOffer.conditions} />
    </div>
  );
};

export default OfferDetailScreen;
