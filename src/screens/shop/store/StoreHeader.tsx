import React from "react";
import StoreFollowButton from "./StoreFollowButton";

const StoreHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      <div>
        <h1 className="font-bold text-xl">Boutique du Créateur</h1>
        <p className="text-gray-500">Ventes totales : 1,250 €</p>
      </div>
      <StoreFollowButton />
    </div>
  );
};

export default StoreHeader;
