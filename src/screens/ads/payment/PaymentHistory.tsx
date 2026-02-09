import React from "react";

const history = [
  { id: "1", date: "2026-01-12", amount: "168 €", status: "Payé" },
  { id: "2", date: "2026-01-05", amount: "84 €", status: "Payé" },
];

const PaymentHistory: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-2">Historique des paiements</h2>

      <ul className="text-sm space-y-1">
        {history.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.date}</span>
            <span>{item.amount}</span>
            <span className="text-green-600">{item.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
