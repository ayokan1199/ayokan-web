import React from "react";

interface GiftHistoryItem {
  id: string;
  sender: string;
  giftName: string;
  price: number;
  date: string;
}

const giftHistory: GiftHistoryItem[] = [
  {
    id: "1",
    sender: "Luna",
    giftName: "Rose",
    price: 10,
    date: "Today 21:04",
  },
  {
    id: "2",
    sender: "Alex",
    giftName: "Fire",
    price: 50,
    date: "Yesterday 22:15",
  },
];

const GiftHistory: React.FC = () => {
  if (giftHistory.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center p-4">
        No gifts received yet
      </div>
    );
  }

  return (
    <div className="bg-white rounded shadow p-4 space-y-3">
      <h3 className="font-semibold">Gift History</h3>

      {giftHistory.map((gift) => (
        <div
          key={gift.id}
          className="flex justify-between items-center text-sm border-b pb-2 last:border-b-0"
        >
          <div>
            <p className="font-medium">{gift.sender}</p>
            <p className="text-gray-500">
              Sent {gift.giftName}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">{gift.price} sparks</p>
            <p className="text-xs text-gray-400">{gift.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftHistory;
