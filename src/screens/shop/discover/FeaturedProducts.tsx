import React from "react";
import ProductCard from "../shared/ProductCard";

const featured = [
  { id: "1", name: "T-shirt Premium", price: 25, image: "/images/tshirt.jpg" },
  { id: "2", name: "Casque audio VIP", price: 120, image: "/images/headset.jpg" },
  { id: "3", name: "Montre Gold", price: 450, image: "/images/watch.jpg" },
];

const FeaturedProducts: React.FC = () => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">Produits en vedette</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {featured.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
