import React, { useState } from "react";

const categories = ["Populaire", "Nouveautés", "Promotions", "VIP", "Gold"];

const CategoryTabs: React.FC = () => {
  const [active, setActive] = useState(categories[0]);

  return (
    <div className="flex space-x-2 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded ${
            active === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
