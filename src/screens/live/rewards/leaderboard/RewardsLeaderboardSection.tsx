import React from "react";
import TopGiftSenders from "./TopGiftSenders";
import UserRankStatus from "./UserRankStatus";

interface Props {
  topSenders: { id: string; name: string; giftsSent: number; avatarUrl: string }[];
  currentUserRank: number;
  currentUserGiftsSent: number;
}

const RewardsLeaderboardSection: React.FC<Props> = ({
  topSenders,
  currentUserRank,
  currentUserGiftsSent,
}) => {
  return (
    <div className="bg-white shadow rounded p-4 space-y-4">
      <h3 className="text-xl font-bold">Classement des récompenses</h3>

      <TopGiftSenders senders={topSenders} />

      <UserRankStatus rank={currentUserRank} giftsSent={currentUserGiftsSent} />
    </div>
  );
};

export default RewardsLeaderboardSection;
