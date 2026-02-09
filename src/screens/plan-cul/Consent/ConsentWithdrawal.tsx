import React from "react";

const ConsentWithdrawal: React.FC = () => {
  const handleWithdrawal = () => {
    alert("Votre consentement a été retiré. Certaines fonctionnalités +18 seront désactivées.");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4 text-center">
      <h2 className="text-xl font-semibold">Retirer mon consentement</h2>
      <p className="text-gray-700">
        En retirant votre consentement, certaines fonctionnalités Plan Cul ne seront plus accessibles.
      </p>
      <button
        onClick={handleWithdrawal}
        className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
      >
        Retirer mon consentement
      </button>
    </div>
  );
};

export default ConsentWithdrawal;
