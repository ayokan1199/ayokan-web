import React from "react";

interface Order {
  id: string;
  number: string;
  date: string;
  total: number;
  status: string;
}

interface Props {
  order: Order;
}

const OrderDetails: React.FC<Props> = ({ order }) => {
  // Exemple : détails fictifs
  const items = [
    { name: "Produit A", quantity: 2, price: 25.0 },
    { name: "Produit B", quantity: 1, price: 70.5 },
  ];

  return (
    <div className="mt-2 border-t pt-2 space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between">
          <p>{item.quantity} × {item.name}</p>
          <p>${(item.quantity * item.price).toFixed(2)}</p>
        </div>
      ))}
      <div className="flex justify-between font-bold border-t pt-2">
        <p>Total</p>
        <p>${items.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
