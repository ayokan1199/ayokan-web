import React from "react";
import { ExplicitBadge } from "./ExplicitBadge";

interface Props {
  name?: string;
  age?: number;
  photoUrl?: string;
}

const UserCardExplicit: React.FC<Props> = ({
  name = "Utilisateur",
  age = 21,
  photoUrl = "https://via.placeholder.com/150",
}) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-4">
      <img src={photoUrl} alt={name} className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-bold">{name}, {age}</h2>
          <ExplicitBadge />
        </div>
        <p className="text-gray-500 text-sm">À proximité</p>
      </div>
    </div>
  );
};

export default UserCardExplicit;
