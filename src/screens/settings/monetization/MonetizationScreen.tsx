import React from "react";
import SparkWallet from "./SparkWallet";
import Subscriptions from "./Subscriptions";
import EarningsSummary from "./EarningsSummary";
import WithdrawSettings from "./WithdrawSettings";

const MonetizationScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Monétisation</h1>

      <SparkWallet />
      <Subscriptions />
      <EarningsSummary />
      <WithdrawSettings />
    </div>
  );
};

export default MonetizationScreen;
