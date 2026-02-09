import React from "react";
import GiftItem from "./GiftItem";

// Exemple de cadeaux disponibles
const gifts = [
  { name: "Rose", price: 10 },
  { name: "Fire", price: 50 },
  { name: "Crown", price: 200 },
  { name: "Diamond", price: 500 },
  { name: "Heart", price: 5 },
  { name: "Star", price: 15 },
];

const GiftPanel: React.FC = () => {
  return (
    <div className="bg-white p-3 rounded shadow grid grid-cols-3 gap-2">
      {gifts.map((gift) => (
        <GiftItem key={gift.name} {...gift} />
      ))}
    </div>
  );
};

export default GiftPanel;
