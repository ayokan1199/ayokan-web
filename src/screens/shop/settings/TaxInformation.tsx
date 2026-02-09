import React, { useState } from "react";

const TaxInformation: React.FC = () => {
  const [taxId, setTaxId] = useState("");
  const [vatRate, setVatRate] = useState(20);

  const handleSave = () => {
    alert("Informations fiscales sauvegardées !");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Informations fiscales</h2>
      <input
        type="text"
        placeholder="Numéro de TVA / SIRET"
        value={taxId}
        onChange={(e) => setTaxId(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="number"
        placeholder="Taux TVA (%)"
        value={vatRate}
        onChange={(e) => setVatRate(Number(e.target.value))}
        className="border rounded p-2 w-full"
        min={0}
        max={100}
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

export default TaxInformation;
