import React from "react";

interface ShopEmptyStateProps {
  message?: string;
}

const ShopEmptyState: React.FC<ShopEmptyStateProps> = ({
  message = "Aucun produit disponible pour le moment."
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="text-gray-400 text-6xl mb-4">🛒</div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default ShopEmptyState;
