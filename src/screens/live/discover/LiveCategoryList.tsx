import React, { useState } from "react";

const categories = ["All", "Music", "Gaming", "Talk", "Cozy", "Premium"];

const LiveCategoryList: React.FC = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            active === cat
              ? "bg-pink-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default LiveCategoryList;
