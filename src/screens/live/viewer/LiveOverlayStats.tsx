import React from "react";
import LiveBadge from "../shared/LiveBadge";

interface Props {
  viewers: number;
  hearts: number;
  hostBadge?: string;
}

const LiveOverlayStats: React.FC<Props> = ({ viewers, hearts, hostBadge }) => {
  return (
    <div className="absolute top-2 left-2 bg-black bg-opacity-40 text-white p-2 rounded space-y-1 text-sm">
      <p>Spectateurs: {viewers}</p>
      <p>❤️ {hearts}</p>
      {hostBadge && <LiveBadge label={hostBadge} color="bg-red-500" />}
    </div>
  );
};

export default LiveOverlayStats;
