import React from "react";
import LiveChat from "./LiveChat";

const LiveChatOverlay: React.FC = () => {
  return (
    <div className="absolute bottom-20 right-4 w-64">
      <LiveChat />
    </div>
  );
};

export default LiveChatOverlay;
