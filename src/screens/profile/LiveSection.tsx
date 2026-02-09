import React from "react";

const LiveSection: React.FC = () => {
  const lives = Array.from({ length: 3 }, (_, i) => ({ title: `LIVE ${i + 1}`, viewers: 120 + i * 50 }));
  return (
    <div className="p-2 bg-white mt-2">
      <h3 className="font-bold mb-2">LIVE récents / en cours</h3>
      <div className="flex gap-2 overflow-x-auto">
        {lives.map((live, i) => (
          <div key={i} className="w-40 h-24 bg-red-500 text-white rounded flex flex-col justify-center items-center">
            <span>{live.title}</span>
            <span>{live.viewers} viewers</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSection;
