import React from "react";

interface Props {
  name: string;
  price: number;
}

const GiftItem: React.FC<Props> = ({ name, price }) => {
  return (
    <div className="bg-white text-black rounded p-2 text-center">
      <div className="text-lg">🎁</div>
      <div className="text-sm">{name}</div>
      <div className="text-xs text-gray-500">{price} sparks</div>
    </div>
  );
};

export default GiftItem;
