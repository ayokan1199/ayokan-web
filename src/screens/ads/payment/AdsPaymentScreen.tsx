import React, { useState } from "react";
import PaymentMethods from "./PaymentMethods";
import InvoicePreview from "./InvoicePreview";
import PaymentConfirmation from "./PaymentConfirmation";
import PaymentHistory from "./PaymentHistory";

const AdsPaymentScreen: React.FC = () => {
  const [method, setMethod] = useState<string>("card");
  const [paid, setPaid] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Paiement</h1>

      {!paid ? (
        <>
          <PaymentMethods value={method} onChange={setMethod} />
          <InvoicePreview />
          <PaymentConfirmation onConfirm={() => setPaid(true)} />
        </>
      ) : (
        <PaymentHistory />
      )}
    </div>
  );
};

export default AdsPaymentScreen;
