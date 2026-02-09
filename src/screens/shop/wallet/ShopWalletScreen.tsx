import React from "react";
import EarningsOverview from "./EarningsOverview";
import WithdrawFunds from "./WithdrawFunds";
import TransactionsHistory from "./TransactionsHistory";
import WalletSettings from "./WalletSettings";

const ShopWalletScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Portefeuille Shop</h1>

      <EarningsOverview />
      <WithdrawFunds />
      <TransactionsHistory />
      <WalletSettings />
    </div>
  );
};

export default ShopWalletScreen;
