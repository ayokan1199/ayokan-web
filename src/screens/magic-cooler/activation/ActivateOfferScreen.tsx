import React, { useState } from "react";
import SparkCheck from "./SparkCheck";
import OfferActivationSuccess from "./OfferActivationSuccess";
import DeepLinkRedirect from "./DeepLinkRedirect";

const sampleOffer = {
  name: "Boost Visibilité Gold",
  cost: 300,
  redirectUrl: "/shop",
};

const ActivateOfferScreen: React.FC = () => {
  const [balance, setBalance] = useState(500); // Solde fictif
  const [activated, setActivated] = useState(false);

  const handleActivate = () => {
    if (balance >= sampleOffer.cost) {
      setBalance(balance - sampleOffer.cost);
      setActivated(true);
    } else {
      alert("Solde insuffisant !");
    }
  };

  return (
    <div className="p-4 space-y-4">
      {!activated ? (
        <>
          <h1 className="text-2xl font-bold">{sampleOffer.name}</h1>
          <SparkCheck balance={balance} cost={sampleOffer.cost} />
          <button
            onClick={handleActivate}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Activer l’offre
          </button>
        </>
      ) : (
        <>
          <OfferActivationSuccess
            offerName={sampleOffer.name}
            onContinue={() => alert("Vous pouvez maintenant visiter la boutique !")}
          />
          <DeepLinkRedirect url={sampleOffer.redirectUrl} />
        </>
      )}
    </div>
  );
};

export default ActivateOfferScreen;
