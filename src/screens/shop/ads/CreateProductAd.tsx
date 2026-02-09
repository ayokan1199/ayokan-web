import React, { useState } from "react";
import AdBudgetSelector from "./AdBudgetSelector";

const CreateProductAd: React.FC = () => {
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState(10);

  const handleCreateAd = () => {
    if (!product) return alert("Veuillez entrer un produit !");
    alert(`Annonce pour "${product}" créée avec un budget de ${budget}€`);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Créer une annonce produit</h2>

      <input
        type="text"
        placeholder="Nom du produit"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <AdBudgetSelector budget={budget} setBudget={setBudget} />

      <button
        onClick={handleCreateAd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Créer l'annonce
      </button>
    </div>
  );
};

export default CreateProductAd;
