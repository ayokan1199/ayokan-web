import React from "react";

interface Props {
  balance: number;
}

const GiftBalanceBar: React.FC<Props> = ({ balance }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-white rounded shadow">
      <span>✨ Solde : {balance}</span>
      <button className="bg-blue-500 text-white px-3 py-1 rounded">Recharge</button>
    </div>
  );
};

export default GiftBalanceBar;
