import React from "react";
import { VISIBILITY_BOOSTS } from "./boost.config";

const BoostVisibility: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="font-semibold text-lg">Booster ta visibilité</h3>
      <p>Ton profil sera mis en avant auprès des utilisateurs proches ou Premium.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {VISIBILITY_BOOSTS.map((boost) => (
          <div
            key={boost.id}
            className="border p-3 rounded text-center hover:shadow-lg transition"
          >
            <h4 className="font-bold">{boost.title}</h4>
            <p className="text-gray-700">{boost.duration}</p>
            <p className="text-blue-500 font-semibold">${boost.price}</p>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Acheter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoostVisibility;
