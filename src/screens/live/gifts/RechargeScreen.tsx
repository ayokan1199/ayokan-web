import React, { useState } from "react";

interface Props {
  balance: number;
  onRecharge: (amount: number) => void;
  onClose: () => void;
}

const RechargeScreen: React.FC<Props> = ({ balance, onRecharge, onClose }) => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-80 p-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-2">Recharger vos étincelles</h2>
        <p className="text-sm mb-2">Solde actuel: {balance} ✨</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          placeholder="Montant à recharger"
          className="w-full border rounded px-2 py-1 mb-2"
        />

        <button
          onClick={() => {
            if (amount > 0) onRecharge(amount);
          }}
          className="w-full bg-green-500 text-white py-2 rounded font-semibold"
        >
          Recharger
        </button>
      </div>
    </div>
  );
};

export default RechargeScreen;
