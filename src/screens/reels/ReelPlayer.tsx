import React, { useRef, useEffect, useState } from "react";
import ReelHeader from "./ReelHeader";
import ReelActions from "./ReelActions";
import ReelDescription from "./ReelDescription";
import ReelComments from "./ReelComments";
import VideoLoader from "./shared/VideoLoader";

interface ReelPlayerProps {
  videoUrl: string;
  creatorName: string;
  creatorBadge?: string;
  likes: number;
  comments: number;
  views: number;
  description: string;
}

const ReelPlayer: React.FC<ReelPlayerProps> = ({
  videoUrl,
  creatorName,
  creatorBadge,
  likes,
  comments,
  views,
  description,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.play() : videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-black text-white">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        loop
        autoPlay
        muted
        onLoadedData={() => setLoading(false)}
      />

      {loading && <VideoLoader />}

      {/* Overlay Header */}
      <div className="absolute top-0 left-0 w-full p-4">
        <ReelHeader creatorName={creatorName} creatorBadge={creatorBadge} />
      </div>

      {/* Overlay Actions */}
      <div className="absolute bottom-0 right-0 p-4 flex flex-col items-end gap-4">
        <ReelActions likes={likes} comments={comments} views={views} />
      </div>

      {/* Overlay Description + Comments */}
      <div className="absolute bottom-0 left-0 p-4 max-w-[70%]">
        <ReelDescription description={description} />
        <ReelComments comments={[]} />
      </div>
    </div>
  );
};

export default ReelPlayer;
