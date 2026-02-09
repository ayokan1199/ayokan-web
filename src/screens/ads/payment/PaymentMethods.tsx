import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethods: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold">Méthode de paiement</h2>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          checked={value === "card"}
          onChange={() => onChange("card")}
        />
        <span>Carte bancaire</span>
        <span>Paypal</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="radio"
          checked={value === "wallet"}
          onChange={() => onChange("wallet")}
        />
        <span>Portefeuille interne</span>
      </label>
    </div>
  );
};

export default PaymentMethods;
