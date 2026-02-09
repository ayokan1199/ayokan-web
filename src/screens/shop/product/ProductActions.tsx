import React from "react";

const ProductActions: React.FC = () => {
  return (
    <div className="flex space-x-2">
      <button className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Ajouter au panier
      </button>
      <button className="flex-1 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
        Acheter maintenant
      </button>
    </div>
  );
};

export default ProductActions;
