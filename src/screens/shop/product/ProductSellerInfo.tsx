import React from "react";
import StoreFollowButton from "../store/StoreFollowButton";

const ProductSellerInfo: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">Vendu par Boutique Créateur</h3>
        <p className="text-gray-500">Membre depuis 2021 • 1,250 ventes</p>
      </div>
      <StoreFollowButton />
    </div>
  );
};

export default ProductSellerInfo;
