import React from "react";

const InvoicePreview: React.FC = () => {
  return (
    <div className="border rounded bg-gray-50 p-4 space-y-1">
      <h2 className="font-semibold">Aperçu de la facture</h2>

      <div className="text-sm text-gray-700">
        <p>Budget total : <strong>140 €</strong></p>
        <p>TVA (20%) : <strong>28 €</strong></p>
        <p className="font-bold mt-1">Total à payer : 168 €</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
