import React from "react";

interface Props {
  onReport?: () => void;
  onBlock?: () => void;
  onShare?: () => void;
}

const LiveViewerMenu: React.FC<Props> = ({ onReport, onBlock, onShare }) => {
  return (
    <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white rounded p-2 flex flex-col space-y-1 text-sm">
      <button onClick={onReport} className="hover:text-red-400">🚩 Signaler</button>
      <button onClick={onBlock} className="hover:text-red-400">⛔ Bloquer</button>
      <button onClick={onShare} className="hover:text-green-400">🔗 Partager</button>
    </div>
  );
};

export default LiveViewerMenu;
