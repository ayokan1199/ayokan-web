import React from "react";

interface Props {
  videoUrl: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
}

const LiveVideoPlayer: React.FC<Props> = ({
  videoUrl,
  autoPlay = true,
  muted = true,
  controls = false,
}) => {
  return (
    <video
      src={videoUrl}
      autoPlay={autoPlay}
      muted={muted}
      controls={controls}
      className="w-full h-full object-cover"
    />
  );
};

export default LiveVideoPlayer;
