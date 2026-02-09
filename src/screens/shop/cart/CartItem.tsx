import React from "react";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex justify-between items-center bg-white rounded shadow p-3">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-gray-500">{item.quantity} × ${item.price}</p>
      </div>
      <p className="font-bold">${item.price * item.quantity}</p>
    </div>
  );
};

export default CartItem;
