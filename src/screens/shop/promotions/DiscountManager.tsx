import React from "react";

interface Props {
  product: string;
  value: number; // pourcentage de réduction
}

const DiscountManager: React.FC<Props> = ({ product, value }) => {
  const handleApplyDiscount = () => {
    alert(`Une réduction de ${value}% a été appliquée au produit "${product}" !`);
  };

  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <p className="font-semibold">{product} - {value}%</p>
      <button
        onClick={handleApplyDiscount}
        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
      >
        Appliquer
      </button>
    </div>
  );
};

export default DiscountManager;
