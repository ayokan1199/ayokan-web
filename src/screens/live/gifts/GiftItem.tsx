import React from "react";

interface Props {
  id: string;
  name: string;
  icon: string;
  cost: number;
  onSend?: (id: string) => void;
}

const GiftItem: React.FC<Props> = ({ id, name, icon, cost, onSend }) => {
  return (
    <div
      className="flex flex-col items-center p-2 bg-white rounded shadow cursor-pointer hover:scale-105 transition"
      onClick={() => onSend?.(id)}
    >
      <img src={icon} alt={name} className="w-12 h-12 mb-1" />
      <span className="text-sm font-semibold">{name}</span>
      <span className="text-xs text-gray-500">{cost} ✨</span>
    </div>
  );
};

export default GiftItem;
