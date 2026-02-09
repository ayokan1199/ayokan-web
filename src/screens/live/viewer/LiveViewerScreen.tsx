import React, { useState, useEffect } from "react";
import LiveHeader from "../shared/LiveHeader";
import LiveAvatar from "../shared/LiveAvatar";
import LiveBadge from "../shared/LiveBadge";
import LiveProgressBar from "../shared/LiveProgressBar";
import LiveEmptyState from "../shared/LiveEmptyState";
import LiveLoading from "../shared/LiveLoading";
import LiveVideoPlayer from "./LiveVideoPlayer";
import LiveChat from "./LiveChat";
import LiveActionsBar from "./LiveActionsBar";

// Données factices pour démo
const mockLive = {
  id: "live1",
  title: "Live du jour",
  hostName: "Alice",
  hostAvatarUrl: "/avatars/alice.png",
  hostBadge: "VIP",
  viewers: 350,
  hearts: 1200,
  progress: 45,
};

const LiveViewerScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState<typeof mockLive | null>(null);

  useEffect(() => {
    // Simuler chargement du live
    const timer = setTimeout(() => {
      setLiveData(mockLive);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LiveLoading />;

  if (!liveData) return <LiveEmptyState message="Aucun live disponible" />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <LiveHeader
        title={liveData.title}
        hostName={liveData.hostName}
        hostAvatarUrl={liveData.hostAvatarUrl}
        rightElement={<LiveBadge label={liveData.hostBadge} color="bg-red-500" />}
      />

      {/* Video Player */}
      <div className="flex-1 bg-black relative">
        <LiveVideoPlayer videoUrl="/videos/sample-live.mp4" />

        {/* Overlay Stats */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-40 text-white p-2 rounded">
          <p>{liveData.viewers} spectateurs</p>
          <p>{liveData.hearts} ❤️</p>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-16 left-4 right-4">
          <LiveProgressBar progress={liveData.progress} color="bg-pink-500" />
        </div>

        {/* Chat Overlay */}
        <LiveChat />
      </div>

      {/* Actions Bar */}
      <LiveActionsBar />
    </div>
  );
};

export default LiveViewerScreen;
