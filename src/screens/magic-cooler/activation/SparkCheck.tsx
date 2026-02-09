import React from "react";

interface Props {
  balance: number;
  cost: number;
}

const SparkCheck: React.FC<Props> = ({ balance, cost }) => {
  const hasEnough = balance >= cost;

  return (
    <div className="p-4 rounded shadow bg-white flex flex-col space-y-2">
      <p>Solde actuel : <span className="font-semibold">{balance} Étincelles</span></p>
      <p>Coût de l’offre : <span className="font-semibold">{cost} Étincelles</span></p>
      {hasEnough ? (
        <p className="text-green-600 font-semibold">Vous pouvez activer cette offre ✅</p>
      ) : (
        <p className="text-red-600 font-semibold">Solde insuffisant ❌</p>
      )}
    </div>
  );
};

export default SparkCheck;
