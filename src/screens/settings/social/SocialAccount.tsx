import React from "react";

interface SocialAccountProps {
  platform: string;
  username?: string;
}

const SocialAccount: React.FC<SocialAccountProps> = ({ platform, username }) => {
  return (
    <div className="flex justify-between items-center p-3 border rounded-md">
      <span>{platform}</span>
      {username && <span className="text-gray-500">{username}</span>}
    </div>
  );
};

export default SocialAccount;
