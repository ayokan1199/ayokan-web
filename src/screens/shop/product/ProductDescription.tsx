import React from "react";

const ProductDescription: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-bold text-lg mb-2">Nom du produit</h2>
      <p className="text-gray-700">
        Voici une description détaillée du produit. 
        Il inclut toutes les informations nécessaires pour l’acheteur, 
        y compris les caractéristiques et les avantages principaux.
      </p>
    </div>
  );
};

export default ProductDescription;
