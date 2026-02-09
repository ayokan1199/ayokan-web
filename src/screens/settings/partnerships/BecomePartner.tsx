import React, { useState } from "react";
import PartnerStatus from "./PartnerStatus";

const BecomePartner: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu peux envoyer les données vers ton backend
    setSubmitted(true);
  };

  if (submitted) {
    return <PartnerStatus status="En attente" date={new Date().toLocaleDateString()} />;
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h2 className="font-semibold text-lg">Devenir partenaire</h2>
      <p className="text-sm text-gray-600">
        Remplis le formulaire pour rejoindre notre réseau de partenaires.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nom complet / Nom de l'entreprise"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          placeholder="Site web / Portfolio"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Envoyer la candidature
        </button>
      </form>
    </div>
  );
};

export default BecomePartner;
