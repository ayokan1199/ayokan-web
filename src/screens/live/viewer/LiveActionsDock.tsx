import React from "react";

interface Props {
  onGift?: () => void;
  onLike?: () => void;
  onFollow?: () => void;
  onMore?: () => void;
}

const LiveActionsDock: React.FC<Props> = ({ onGift, onLike, onFollow, onMore }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-black bg-opacity-40 p-2 rounded-full">
      <button onClick={onGift} className="text-white text-lg">
        🎁
      </button>
      <button onClick={onLike} className="text-white text-lg">
        ❤️
      </button>
      <button onClick={onFollow} className="text-white text-lg">
        👀
      </button>
      <button onClick={onMore} className="text-white text-lg">
        ⋯
      </button>
    </div>
  );
};

export default LiveActionsDock;
