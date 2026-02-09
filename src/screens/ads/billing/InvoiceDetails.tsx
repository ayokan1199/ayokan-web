import React from "react";

// Définition du type pour une facture
interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
}

// Props du composant
interface InvoiceDetailsProps {
  invoice: Invoice;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ invoice }) => {
  return (
    <div className="p-2 border rounded shadow">
      <p><strong>ID:</strong> {invoice.id}</p>
      <p><strong>Date:</strong> {invoice.date}</p>
      <p><strong>Montant:</strong> {invoice.amount} €</p>
      <p><strong>Statut:</strong> {invoice.status}</p>
    </div>
  );
};

export default InvoiceDetails;
