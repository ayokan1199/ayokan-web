import React from "react";
import GiftItem from "./GiftItem";

interface Gift {
  id: string;
  name: string;
  icon: string;
  cost: number;
}

interface Props {
  gifts: Gift[];
  onSendGift?: (id: string) => void;
}

const GiftPanel: React.FC<Props> = ({ gifts, onSendGift }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto p-2 bg-gray-100 rounded">
      {gifts.map((gift) => (
        <GiftItem
          key={gift.id}
          id={gift.id}
          name={gift.name}
          icon={gift.icon}
          cost={gift.cost}
          onSend={onSendGift}
        />
      ))}
    </div>
  );
};

export default GiftPanel;
