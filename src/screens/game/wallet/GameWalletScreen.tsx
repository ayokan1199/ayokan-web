import React from "react";
import SparkBalance from "./SparkBalance";
import EarnedRewards from "./EarnedRewards";
import SpendHistory from "./SpendHistory";
import WalletTips from "./WalletTips";

const WalletScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-xl font-bold mb-4">Portefeuille</h2>
      <SparkBalance balance={1200} />
      <EarnedRewards />
      <SpendHistory />
      <WalletTips />
    </div>
  );
};

export default WalletScreen;
