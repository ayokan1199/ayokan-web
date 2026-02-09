import React, { useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ReelPlayer from "./ReelPlayer";

interface Reel {
  id: number;
  videoUrl: string;
  creatorName: string;
  creatorBadge?: string;
  likes: number;
  comments: number;
  views: number;
  description: string;
}

// Données initiales
const initialReels: Reel[] = [
  { id: 1, videoUrl: "/videos/video1.mp4", creatorName: "Alice", likes: 120, comments: 10, views: 1000, description: "Vidéo populaire #fun" },
  { id: 2, videoUrl: "/videos/video2.mp4", creatorName: "Bob", likes: 200, comments: 20, views: 3000, description: "Reel tendance #challenge" },
];

// Mock API pour plus de vidéos
const fetchMoreVideos = async (lastId: number): Promise<Reel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: lastId + 1, videoUrl: "/videos/video3.mp4", creatorName: "Charlie", likes: 50, comments: 5, views: 500, description: "Nouvelle vidéo #fresh" },
        { id: lastId + 2, videoUrl: "/videos/video4.mp4", creatorName: "VIPUser", creatorBadge: "VIP", likes: 500, comments: 50, views: 10000, description: "Contenu Premium" },
      ]);
    }, 1000);
  });
};

const ReelsScreen: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>(initialReels);
  const [loading, setLoading] = useState(false);

  // Charger plus de vidéos
  const handleLoadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const moreReels = await fetchMoreVideos(reels[reels.length - 1].id);
    setReels((prev) => [...prev, ...moreReels]);
    setLoading(false);
  }, [loading, reels]);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {reels.map((reel, index) => (
        <ReelItem
          key={reel.id}
          reel={reel}
          onEnd={() => index === reels.length - 1 && handleLoadMore()}
          preloadNext={reels[index + 1]?.videoUrl}
          preloadPrev={reels[index - 1]?.videoUrl}
        />
      ))}
      {loading && (
        <div className="text-center py-4 text-white bg-black">
          ⏳ Chargement...
        </div>
      )}
    </div>
  );
};

interface ReelItemProps {
  reel: Reel;
  onEnd: () => void;
  preloadNext?: string;
  preloadPrev?: string;
}

const ReelItem: React.FC<ReelItemProps> = ({ reel, onEnd, preloadNext, preloadPrev }) => {
  const { ref, inView } = useInView({ threshold: 0.7 });

  // Lecture automatique + appel onEnd
  useEffect(() => {
    if (inView) {
      onEnd();
    }
  }, [inView, onEnd]);

  // Préchargement vidéos suivantes et précédentes
  useEffect(() => {
    if (preloadNext) {
      const video = document.createElement("video");
      video.src = preloadNext;
      video.preload = "auto";
    }
    if (preloadPrev) {
      const video = document.createElement("video");
      video.src = preloadPrev;
      video.preload = "auto";
    }
  }, [preloadNext, preloadPrev]);

  return (
    <div ref={ref} className="snap-start h-screen">
      <ReelPlayer
        videoUrl={reel.videoUrl}
        creatorName={reel.creatorName}
        creatorBadge={reel.creatorBadge}
        likes={reel.likes}
        comments={reel.comments}
        views={reel.views}
        description={reel.description}
      />
    </div>
  );
};

export default ReelsScreen;
