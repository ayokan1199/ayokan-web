// screens/bluezone/home/BluezoneHomeScreen.tsx
import React, { useState } from "react";

// Type pour un post
type Post = {
  id: number;
  author: string;
  content: string;
  media?: string;
  likes: number;
  comments: number;
  isLive?: boolean;
};

// Exemple de données
const initialPosts: Post[] = [
  {
    id: 1,
    author: "Alice",
    content: "Salut tout le monde ! Bienvenue dans BlueZone 🌈",
    likes: 5,
    comments: 2,
  },
  {
    id: 2,
    author: "Bob",
    content: "Voici ma story du jour !",
    media: "https://placekitten.com/400/200",
    likes: 12,
    comments: 4,
  },
  {
    id: 3,
    author: "Charlie",
    content: "Live en cours 🎥",
    isLive: true,
    likes: 20,
    comments: 5,
  },
];

const BluezoneHomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  return (
    <div className="min-h-screen p-6 max-w-xl mx-auto bg-gray-50 space-y-6">
      <h1 className="text-2xl font-bold">Feed BlueZone</h1>

      {/* Stories */}
      <div className="flex gap-4 overflow-x-auto py-2">
        {["Alice", "Bob", "Charlie"].map((name) => (
          <div key={name} className="flex-shrink-0 w-20 h-20 rounded-full bg-indigo-200 flex items-center justify-center font-semibold">
            {name[0]}
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{post.author}</span>
              {post.isLive && <span className="text-red-500 font-bold">LIVE</span>}
            </div>
            <p className="mb-2">{post.content}</p>
            {post.media && <img src={post.media} alt="media" className="w-full rounded" />}
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BluezoneHomeScreen;
