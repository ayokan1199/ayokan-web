import React from "react";

interface Props {
  product: string;
}

const BoostProduct: React.FC<Props> = ({ product }) => {
  const handleBoost = () => {
    alert(`Le produit "${product}" a été boosté !`);
  };

  return (
    <div className="bg-white p-3 rounded shadow flex justify-between items-center">
      <p className="font-semibold">{product}</p>
      <button
        onClick={handleBoost}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
        Booster
      </button>
    </div>
  );
};

export default BoostProduct;
