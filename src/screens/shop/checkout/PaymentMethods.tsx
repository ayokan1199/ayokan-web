import React, { useState } from "react";

const PaymentMethods: React.FC = () => {
  const [selected, setSelected] = useState("card");

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">Méthodes de paiement</h2>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selected === "card"}
            onChange={() => setSelected("card")}
          />
          Carte de crédit / débit
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={selected === "paypal"}
            onChange={() => setSelected("paypal")}
          />
          PayPal
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="crypto"
            checked={selected === "crypto"}
            onChange={() => setSelected("crypto")}
          />
          Crypto-monnaie
        </label>
      </div>
    </div>
  );
};

export default PaymentMethods;
