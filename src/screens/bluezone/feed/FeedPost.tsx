// screens/bluezone/feed/FeedPost.tsx
import React from "react";

type FeedPostProps = {
  id: number;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  onLike: (id: number) => void;
};

const FeedPost: React.FC<FeedPostProps> = ({ id, author, content, image, likes, comments, onLike }) => {
  return (
    <div className="border rounded-md p-4 space-y-2 bg-white shadow-sm">
      <p className="font-semibold">{author}</p>
      <p>{content}</p>
      {image && <img src={image} alt="Post" className="w-full rounded" />}
      <div className="flex justify-between mt-2 text-gray-600">
        <button onClick={() => onLike(id)}>👍 {likes}</button>
        <span>💬 {comments}</span>
      </div>
    </div>
  );
};

export default FeedPost;
