// screens/bluezone/reels/ReelsItem.tsx
import React from "react";

type ReelsItemProps = {
  id: number;
  author: string;
  videoUrl: string;
  likes: number;
  comments: number;
  onLike: (id: number) => void;
};

const ReelsItem: React.FC<ReelsItemProps> = ({ id, author, videoUrl, likes, comments, onLike }) => {
  return (
    <div className="border rounded-md p-2 bg-white shadow-sm mb-4">
      <p className="font-semibold">{author}</p>
      <video src={videoUrl} controls className="w-full rounded my-2" />
      <div className="flex justify-between text-gray-600">
        <button onClick={() => onLike(id)}>👍 {likes}</button>
        <span>💬 {comments}</span>
      </div>
    </div>
  );
};

export default ReelsItem;
