import React from "react";

const LoginHistory: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Historique des connexions</h2>
      <p className="text-sm text-gray-500">
        Dernière connexion : Aujourd’hui
      </p>
    </div>
  );
};

export default LoginHistory;
