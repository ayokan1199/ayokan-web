import React, { useState } from "react";

const AgeVerification: React.FC = () => {
  const [age, setAge] = useState<number | "">(""); // initialement vide
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    // On s'assure que age est un nombre avant de comparer
    if (typeof age === "number" && age >= 18) {
      setVerified(true);
      alert("Vérification réussie !");
    } else {
      alert("Vous devez avoir au moins 18 ans.");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 space-y-4 max-w-sm mx-auto">
      <h2 className="font-semibold text-lg">Vérification de l’âge</h2>

      {verified ? (
        <p className="text-green-600 font-semibold">Âge vérifié ✅</p>
      ) : (
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 items-center">
          <input
            type="number"
            placeholder="Entrez votre âge"
            value={age}
            onChange={(e) => {
              const val = e.target.value;
              setAge(val === "" ? "" : Number(val));
            }}
            className="border rounded p-2 w-24 text-center"
          />
          <button
            onClick={handleVerify}
            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Vérifier
          </button>
        </div>
      )}
    </div>
  );
};

export default AgeVerification;
