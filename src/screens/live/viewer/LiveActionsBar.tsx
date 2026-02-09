import React from "react";

const LiveActionsBar: React.FC = () => {
  return (
    <div className="flex justify-around items-center p-3 bg-white shadow">
      <button className="flex flex-col items-center text-sm">
        🎁
        <span>Gift</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        ❤️
        <span>Like</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        👀
        <span>Follow</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        ⚡
        <span>Boost</span>
      </button>
    </div>
  );
};

export default LiveActionsBar;
