import React, { useState } from "react";

const PaymentSettings: React.FC = () => {
  const [paypal, setPaypal] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const handleSave = () => {
    alert("Méthodes de paiement sauvegardées !");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Paramètres de paiement</h2>
      <input
        type="text"
        placeholder="PayPal"
        value={paypal}
        onChange={(e) => setPaypal(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="text"
        placeholder="Compte bancaire"
        value={bankAccount}
        onChange={(e) => setBankAccount(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sauvegarder
      </button>
    </div>
  );
};

export default PaymentSettings;
