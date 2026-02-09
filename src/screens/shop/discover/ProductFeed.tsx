import React from "react";
import ProductCard from "../shared/ProductCard";

const products = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  name: `Produit ${i + 1}`,
  price: (i + 1) * 10,
  image: "/images/product-placeholder.jpg",
}));

const ProductFeed: React.FC = () => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">Découverte</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default ProductFeed;
