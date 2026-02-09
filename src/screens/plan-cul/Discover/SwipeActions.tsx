import React from "react";

const SwipeActions: React.FC = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <button className="p-3 bg-red-500 text-white rounded-full shadow">👎</button>
      <button className="p-3 bg-green-500 text-white rounded-full shadow">👍</button>
    </div>
  );
};

export default SwipeActions;
