import React from "react";
import Avatar from "./shared/Avatar";
import Badge from "./shared/Badge";
import FollowButton from "./shared/FollowButton";

interface ProfileHeaderProps {
  username: string;
  badge?: "Nouveau" | "Premium" | "VIP" | "Gold";
  isFollowing: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, badge, isFollowing }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <Avatar size={60} />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{username}</span>
            {badge && <Badge label={badge} />}
          </div>
          <div className="flex gap-2 mt-1">
            <FollowButton isFollowing={isFollowing} />
            <button className="px-3 py-1 border rounded">Message</button>
            <button className="px-3 py-1 border rounded bg-red-500 text-white">LIVE</button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-2 py-1 rounded hover:bg-gray-200">•••</button>
      </div>
    </div>
  );
};

export default ProfileHeader;
