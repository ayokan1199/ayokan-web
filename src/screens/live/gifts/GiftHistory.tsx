import React from "react";

interface GiftRecord {
  id: string;
  from: string;
  to: string;
  giftName: string;
  timestamp: string;
}

interface Props {
  history: GiftRecord[];
}

const GiftHistory: React.FC<Props> = ({ history }) => {
  return (
    <div className="p-2 max-h-64 overflow-y-auto bg-gray-50 rounded">
      {history.map((h) => (
        <div key={h.id} className="flex justify-between text-sm mb-1">
          <span>{h.from} → {h.to} : {h.giftName}</span>
          <span className="text-gray-400">{h.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default GiftHistory;
