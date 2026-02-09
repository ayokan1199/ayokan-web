import React from "react";

interface Props {
  price: number;
}

const PriceTag: React.FC<Props> = ({ price }) => (
  <span className="text-green-600 font-bold">{price} €</span>
);

export default PriceTag;
