import React from "react";
import PriceTag from "./PriceTag";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="border rounded shadow p-2 bg-white flex flex-col items-center">
      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded mb-2" />
      <h3 className="font-semibold">{product.name}</h3>
      <PriceTag price={product.price} />
    </div>
  );
};

export default ProductCard;
