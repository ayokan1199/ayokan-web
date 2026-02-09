import React from "react";
import OrderItem from "./OrderItem";

const orders = [
  { id: "1", number: "ORD-001", date: "2026-01-15", total: 120.5, status: "En cours" },
  { id: "2", number: "ORD-002", date: "2026-01-10", total: 75.0, status: "Livré" },
];

const OrdersScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Mes commandes</h1>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrdersScreen;
