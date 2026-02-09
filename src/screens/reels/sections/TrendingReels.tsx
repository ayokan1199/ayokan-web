import React from "react";
import ReelPlayer from "../ReelPlayer";

const dummyVideos = [
  {
    videoUrl: "/videos/video1.mp4",
    creatorName: "Alice",
    likes: 120,
    comments: 10,
    views: 1000,
    description: "Vidéo populaire #fun",
  },
  {
    videoUrl: "/videos/video2.mp4",
    creatorName: "Bob",
    likes: 200,
    comments: 20,
    views: 3000,
    description: "Reel tendance #challenge",
  },
];

const TrendingReels: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory">
      {dummyVideos.map((video, i) => (
        <div key={i} className="snap-start h-screen">
          <ReelPlayer {...video} />
        </div>
      ))}
    </div>
  );
};

export default TrendingReels;
