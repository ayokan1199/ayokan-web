import React, { useState } from "react";

interface LikeButtonProps {
  count: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ count }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(count);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <button onClick={toggleLike}>
      {liked ? "❤️" : "🤍"} {likes}
    </button>
  );
};

export default LikeButton;
