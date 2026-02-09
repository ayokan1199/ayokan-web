import React from "react";

const desires = ["Rencontre rapide", "Chat coquin", "LIVE Plan Cul"];

const ProfileDesires: React.FC = () => {
  return (
    <div className="my-4">
      <h3 className="font-semibold mb-2">Désirs</h3>
      <div className="flex flex-wrap gap-2">
        {desires.map((d, idx) => (
          <span
            key={idx}
            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileDesires;
