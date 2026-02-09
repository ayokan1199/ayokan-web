import React from "react";

const OrderSupport: React.FC = () => {
  const handleContact = () => alert("Contactez le support pour cette commande.");

  return (
    <div className="bg-white rounded shadow p-4 flex justify-between items-center">
      <p className="font-semibold">Besoin d’aide ?</p>
      <button
        onClick={handleContact}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Contacter le support
      </button>
    </div>
  );
};

export default OrderSupport;
