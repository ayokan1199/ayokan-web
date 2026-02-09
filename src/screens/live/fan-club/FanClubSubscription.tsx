import React from "react";
import FanClubBadge from "./FanClubBadge";

const FanClubSubscription: React.FC = () => {
  const isMember = false; // brancher backend plus tard

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Exclusive Fan Club</h2>
          <p className="text-sm text-gray-500">
            Support your favorite creator
          </p>
        </div>
        <FanClubBadge />
      </div>

      {!isMember ? (
        <button className="mt-3 w-full bg-pink-500 text-white py-2 rounded">
          Join Fan Club
        </button>
      ) : (
        <div className="mt-3 text-green-600 font-medium">
          You are a member ⭐
        </div>
      )}
    </div>
  );
};

export default FanClubSubscription;
