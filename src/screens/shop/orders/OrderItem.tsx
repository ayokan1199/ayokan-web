import React from "react";
import OrderDetails from "./OrderDetails";

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

const OrderItem: React.FC<Props> = ({ order }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div>
          <p className="font-semibold">{order.number}</p>
          <p className="text-gray-500 text-sm">{order.date}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">${order.total.toFixed(2)}</p>
          <p className={`text-sm ${order.status === "Livré" ? "text-green-600" : "text-yellow-600"}`}>
            {order.status}
          </p>
        </div>
      </div>
      {expanded && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderItem;
