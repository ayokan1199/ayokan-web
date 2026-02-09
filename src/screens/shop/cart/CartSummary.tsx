import React from "react";

interface CartSummaryProps {
  items: { price: number; quantity: number }[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded shadow p-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">Total</h2>
      <p className="font-bold text-xl">${total}</p>
    </div>
  );
};

export default CartSummary;
