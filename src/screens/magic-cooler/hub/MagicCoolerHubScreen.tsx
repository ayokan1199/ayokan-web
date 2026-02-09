import React, { useState } from "react";
import SparkBalance from "./SparkBalance";
import OffersCarousel from "./OffersCarousel";
import RefreshButton from "./RefreshButton";
import CoolerCountdown from "./CoolerCountdown";

const sampleOffers = [
  { id: "1", title: "Boost Visibilité Gold", description: "Réduction spéciale pour vos offres", cost: 300 },
  { id: "2", title: "Diamond Pack", description: "Pack de Diamants bonus", cost: 500 },
  { id: "3", title: "Spark Boost", description: "Accélérez vos gains d’Étincelles", cost: 200 },
];

const MagicCoolerHubScreen: React.FC = () => {
  const [sparkBalance, setSparkBalance] = useState(1200);
  const [offers, setOffers] = useState(sampleOffers);

  const handleRefresh = () => {
    alert("Offres rafraîchies !");
    // Logique backend pour rafraîchir les offres
  };

  const nextRefresh = new Date();
  nextRefresh.setHours(nextRefresh.getHours() + 24);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Glacière Magique</h1>
      <SparkBalance balance={sparkBalance} />
      <CoolerCountdown targetTime={nextRefresh} />
      <RefreshButton onRefresh={handleRefresh} />
      <OffersCarousel offers={offers} />
    </div>
  );
};

export default MagicCoolerHubScreen;
