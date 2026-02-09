import React from "react";

const transactions = [
  { id: "1", date: "2026-01-15", amount: 50, type: "Gain" },
  { id: "2", date: "2026-01-14", amount: 20, type: "Retrait" },
];

const TransactionsHistory: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-2">Historique des transactions</h2>
      <ul className="space-y-1 text-gray-700">
        {transactions.map((tx) => (
          <li key={tx.id} className="flex justify-between">
            <span>{tx.type} : {tx.amount} €</span>
            <span className="text-gray-500 text-sm">{tx.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsHistory;
