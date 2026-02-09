import React from "react";
import StatCard from "./shared/StatCard";

interface ProfileStatsProps {
  followers: number;
  following: number;
  sparks: number;
  reels: number;
  liveCount: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ followers, following, sparks, reels, liveCount }) => {
  return (
    <div className="flex justify-around bg-white p-4 border-b">
      <StatCard label="Followers" value={followers} />
      <StatCard label="Following" value={following} />
      <StatCard label="Étincelles" value={sparks} />
      <StatCard label="Reels" value={reels} />
      <StatCard label="LIVE" value={liveCount} />
    </div>
  );
};

export default ProfileStats;
