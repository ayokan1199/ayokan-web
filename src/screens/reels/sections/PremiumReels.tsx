import React from "react";
import ReelPlayer from "../ReelPlayer";

const premiumVideos = [
  {
    videoUrl: "/videos/video4.mp4",
    creatorName: "VIPUser",
    creatorBadge: "VIP",
    likes: 500,
    comments: 50,
    views: 10000,
    description: "Contenu Premium exclusif",
  },
];

const PremiumReels: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory">
      {premiumVideos.map((video, i) => (
        <div key={i} className="snap-start h-screen">
          <ReelPlayer {...video} />
        </div>
      ))}
    </div>
  );
};

export default PremiumReels;
