import React from "react";
import ReelPlayer from "../ReelPlayer";

const newCreatorsVideos = [
  {
    videoUrl: "/videos/video3.mp4",
    creatorName: "Charlie",
    likes: 10,
    comments: 1,
    views: 50,
    description: "Nouveau créateur #fresh",
  },
];

const NewCreators: React.FC = () => {
  return (
    <div className="h-full overflow-y-scroll snap-y snap-mandatory">
      {newCreatorsVideos.map((video, i) => (
        <div key={i} className="snap-start h-screen">
          <ReelPlayer {...video} />
        </div>
      ))}
    </div>
  );
};

export default NewCreators;
