import React, { useState } from "react";

interface Props {
  onConfirm: () => void;
}

const PaymentConfirmation: React.FC<Props> = ({ onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirm();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="text-right">
      <button
        onClick={handlePay}
        disabled={loading}
        className={`px-6 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Paiement en cours..." : "Payer maintenant"}
      </button>
    </div>
  );
};

export default PaymentConfirmation;
