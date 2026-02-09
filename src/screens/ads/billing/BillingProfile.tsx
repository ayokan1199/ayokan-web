import React from "react";

const BillingProfile: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="text-lg font-bold">Profil de facturation</h2>
      <p>Nom: John Doe</p>
      <p>Email: john.doe@example.com</p>
      <p>Entreprise: Acme Corp</p>
    </div>
  );
};

export default BillingProfile;
