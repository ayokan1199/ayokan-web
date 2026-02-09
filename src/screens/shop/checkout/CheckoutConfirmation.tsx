import React from "react";

const CheckoutConfirmation: React.FC = () => {
  const handleConfirm = () => {
    alert("Commande confirmée ! Merci pour votre achat.");
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleConfirm}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Confirmer la commande
      </button>
    </div>
  );
};

export default CheckoutConfirmation;
