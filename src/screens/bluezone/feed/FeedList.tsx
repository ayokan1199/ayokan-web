// screens/bluezone/feed/FeedList.tsx
import React from "react";

type Post = {
  id: number;
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
};

type FeedListProps = {
  posts: Post[];
};

const FeedList: React.FC<FeedListProps> = ({ posts }) => {
  if (!posts.length) {
    return <p className="text-gray-500 text-center">Aucun post pour le moment.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-md p-4 bg-white shadow-sm">
          <p className="font-bold">{post.author}</p>
          <p className="mt-2">{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="mt-2 rounded" />}
          <div className="flex justify-between text-gray-600 text-sm mt-2">
            <span>❤️ {post.likes}</span>
            <span>💬 {post.comments}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedList;
