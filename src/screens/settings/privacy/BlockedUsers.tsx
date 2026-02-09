import React from "react";

const BlockedUsers: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Utilisateurs bloqués</h2>

      <p className="text-sm text-gray-500">
        Aucun utilisateur bloqué pour le moment.
      </p>

      <button className="text-blue-600 text-sm">
        Gérer les utilisateurs bloqués
      </button>
    </div>
  );
};

export default BlockedUsers;
