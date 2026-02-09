import React from "react";

interface Sender {
  id: string;
  name: string;
  giftsSent: number;
  avatarUrl: string;
}

interface Props {
  senders: Sender[];
}

const TopGiftSenders: React.FC<Props> = ({ senders }) => {
  return (
    <div className="space-y-2">
      {senders.map((sender, index) => (
        <div
          key={sender.id}
          className="flex items-center justify-between bg-gray-50 p-2 rounded"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold">{index + 1}</span>
            <img
              src={sender.avatarUrl}
              alt={sender.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{sender.name}</span>
          </div>
          <span className="font-bold text-pink-500">{sender.giftsSent} 🎁</span>
        </div>
      ))}
    </div>
  );
};

export default TopGiftSenders;
