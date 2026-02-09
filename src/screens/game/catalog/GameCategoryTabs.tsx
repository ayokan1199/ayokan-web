import React from "react";

interface Props {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

const GameCategoryTabs: React.FC<Props> = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            activeCategory === cat
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default GameCategoryTabs;
