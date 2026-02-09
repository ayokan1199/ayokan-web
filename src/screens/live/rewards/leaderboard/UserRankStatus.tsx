import React from "react";

interface Props {
  rank: number;
  giftsSent: number;
}

const UserRankStatus: React.FC<Props> = ({ rank, giftsSent }) => {
  return (
    <div className="bg-yellow-50 p-3 rounded shadow flex justify-between items-center">
      <span className="font-semibold">Votre rang: {rank}</span>
      <span className="font-bold text-pink-500">Cadeaux envoyés: {giftsSent}</span>
    </div>
  );
};

export default UserRankStatus;
