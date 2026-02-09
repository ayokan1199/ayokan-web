import React from "react";
import LikeButton from "./shared/LikeButton";
import GiftButton from "./shared/GiftButton";

interface ReelActionsProps {
  likes: number;
  comments: number;
  views: number;
}

const ReelActions: React.FC<ReelActionsProps> = ({ likes, comments, views }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <LikeButton count={likes} />
      <button>💬 {comments}</button>
      <button>🔗 Share</button>
      <GiftButton />
    </div>
  );
};

export default ReelActions;
