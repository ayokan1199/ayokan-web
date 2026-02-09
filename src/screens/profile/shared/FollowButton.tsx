import React, { useState } from "react";

interface FollowButtonProps {
  isFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing: initial }) => {
  const [isFollowing, setIsFollowing] = useState(initial);
  return (
    <button
      onClick={() => setIsFollowing(!isFollowing)}
      className={`px-3 py-1 rounded border ${isFollowing ? "bg-gray-200" : "bg-blue-500 text-white"}`}
    >
      {isFollowing ? "Suivie" : "Suivre"}
    </button>
  );
};

export default FollowButton;
