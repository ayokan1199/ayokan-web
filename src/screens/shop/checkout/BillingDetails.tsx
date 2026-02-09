import React, { useState } from "react";

const BillingDetails: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">Informations de facturation</h2>
      <input
        type="text"
        placeholder="Nom complet"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="text"
        placeholder="Adresse"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded p-2 w-full"
      />
    </div>
  );
};

export default BillingDetails;
