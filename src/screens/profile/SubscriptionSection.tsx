import React from "react";

const SubscriptionSection: React.FC = () => {
  const subs = ["Premium", "VIP", "Gold"];
  return (
    <div className="p-2 bg-white mt-2">
      <h3 className="font-bold mb-2">Abonnements</h3>
      <div className="flex gap-2">
        {subs.map((s, i) => (
          <button key={i} className="px-3 py-1 bg-blue-500 text-white rounded">{s}</button>
        ))}
      </div>
      <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Passer en Premium</button>
    </div>
  );
};

export default SubscriptionSection;
