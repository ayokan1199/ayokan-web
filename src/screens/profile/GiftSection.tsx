import React from "react";

const GiftSection: React.FC = () => {
  const gifts = Array.from({ length: 5 }, (_, i) => `🎁 Gift ${i + 1}`);
  return (
    <div className="p-2 bg-white mt-2">
      <h3 className="font-bold mb-2">Envoyer / Voir Cadeaux</h3>
      <div className="flex gap-2 overflow-x-auto">
        {gifts.map((g, i) => <div key={i} className="p-2 bg-pink-200 rounded">{g}</div>)}
      </div>
    </div>
  );
};

export default GiftSection;
