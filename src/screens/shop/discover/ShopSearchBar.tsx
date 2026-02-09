import React, { useState } from "react";

const ShopSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Recherche :", query);
    // ici tu pourrais déclencher un filtrage du feed
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="Rechercher des produits..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2 flex-1"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Rechercher
      </button>
    </div>
  );
};

export default ShopSearchBar;
