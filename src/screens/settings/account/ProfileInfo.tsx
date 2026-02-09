import React from "react";
import { UserProfile } from "./account.types";

interface Props {
  profile: UserProfile;
}

const ProfileInfo: React.FC<Props> = ({ profile }) => {
  return (
    <div className="p-4 border rounded space-y-1">
      <p className="font-semibold">@{profile.username}</p>
      <p className="text-sm text-gray-600">{profile.email}</p>
      {profile.phone && <p className="text-sm">{profile.phone}</p>}
      <span className={profile.verified ? "text-green-600" : "text-red-500"}>
        {profile.verified ? "Compte vérifié" : "Compte non vérifié"}
      </span>
    </div>
  );
};

export default ProfileInfo;
