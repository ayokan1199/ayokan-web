import React from "react";

const PrivateAccess: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="font-semibold text-lg">Accès privé</h3>
      <p>Autorise uniquement les membres Premium à voir ton profil et tes publications.</p>
      <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
        Activer Accès Privé
      </button>
    </div>
  );
};

export default PrivateAccess;
