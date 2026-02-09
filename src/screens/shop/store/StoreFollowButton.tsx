import React, { useState } from "react";

const StoreFollowButton: React.FC = () => {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`px-4 py-2 rounded font-semibold ${
        following ? "bg-gray-300 text-gray-800" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {following ? "Suivi" : "Suivre"}
    </button>
  );
};

export default StoreFollowButton;
