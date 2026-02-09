import React, { useState } from "react";

const ShippingSettings: React.FC = () => {
  const [defaultShipping, setDefaultShipping] = useState("Standard");
  const [freeShipping, setFreeShipping] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Paramètres de livraison</h2>
      <select
        value={defaultShipping}
        onChange={(e) => setDefaultShipping(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="Standard">Standard</option>
        <option value="Express">Express</option>
        <option value="Overnight">Overnight</option>
      </select>

      <div className="flex items-center justify-between">
        <span>Livraison gratuite pour commandes supérieures à 50 €</span>
        <input
          type="checkbox"
          checked={freeShipping}
          onChange={() => setFreeShipping(!freeShipping)}
        />
      </div>
    </div>
  );
};

export default ShippingSettings;
