import React from "react";
import InvoicesList from "./InvoicesList";

const BillingScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Facturation & Paiements</h1>
      <InvoicesList />
    </div>
  );
};

export default BillingScreen;
