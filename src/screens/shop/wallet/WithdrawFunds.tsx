import React, { useState } from "react";

const WithdrawFunds: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleWithdraw = () => {
    if (amount <= 0) return alert("Veuillez entrer un montant valide !");
    alert(`Demande de retrait de ${amount} € envoyée !`);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Retirer des fonds</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border rounded p-2 w-32"
        placeholder="Montant €"
        min={1}
      />

      <button
        onClick={handleWithdraw}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Retirer
      </button>
    </div>
  );
};

export default WithdrawFunds;
