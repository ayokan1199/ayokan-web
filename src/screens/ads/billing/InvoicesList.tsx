import React from "react";
import InvoiceDetails from "./InvoiceDetails";

// Même type que dans InvoiceDetails
interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
}

const invoices: Invoice[] = [
  { id: "1", date: "2026-01-01", amount: 120.5, status: "paid" },
  { id: "2", date: "2026-01-05", amount: 80, status: "pending" },
  { id: "3", date: "2026-01-10", amount: 200, status: "paid" },
];

const InvoicesList: React.FC = () => {
  return (
    <div className="space-y-2">
      {invoices.map((invoice) => (
        <InvoiceDetails key={invoice.id} invoice={invoice} />
      ))}
    </div>
  );
};

export default InvoicesList;
