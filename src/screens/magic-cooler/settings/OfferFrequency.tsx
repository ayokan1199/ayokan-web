import React, { useState } from "react";

const OfferFrequency: React.FC = () => {
  const [offersPerDay, setOffersPerDay] = useState(3);

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-bold text-lg">Fréquence des offres</h2>
      <p>Nombre maximum d'offres par jour :</p>
      <input
        type="number"
        min={1}
        max={10}
        value={offersPerDay}
        onChange={(e) => setOffersPerDay(Number(e.target.value))}
        className="border rounded p-2 w-20"
      />
    </div>
  );
};

export default OfferFrequency;
