import React from "react";
import ActivatedOfferItem from "./ActivatedOfferItem";
import UsedOfferStatus from "./UsedOfferStatus";
import ExpiredOfferStatus from "./ExpiredOfferStatus";

const activatedOffers = [
  { id: "1", offerName: "Boost Gold", dateActivated: "2026-01-10", sparksUsed: 300 },
];

const usedOffers = [
  { id: "2", offerName: "Boost Silver", dateUsed: "2026-01-12" },
];

const expiredOffers = [
  { id: "3", offerName: "Boost Bronze", expiryDate: "2026-01-08" },
];

const MagicCoolerHistoryScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Historique Glacière Magique</h1>

      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Offres activées</h2>
        {activatedOffers.map((offer) => (
          <ActivatedOfferItem
            key={offer.id}
            offerName={offer.offerName}
            dateActivated={offer.dateActivated}
            sparksUsed={offer.sparksUsed}
          />
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Offres utilisées</h2>
        {usedOffers.map((offer) => (
          <UsedOfferStatus
            key={offer.id}
            offerName={offer.offerName}
            dateUsed={offer.dateUsed}
          />
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="font-semibold text-lg">Offres expirées</h2>
        {expiredOffers.map((offer) => (
          <ExpiredOfferStatus
            key={offer.id}
            offerName={offer.offerName}
            expiryDate={offer.expiryDate}
          />
        ))}
      </section>
    </div>
  );
};

export default MagicCoolerHistoryScreen;
