import React from "react";
import UserCardExplicit from "./UserCardExplicit";

const NearbyUsers: React.FC = () => {
  return (
    <div className="space-y-2">
      <UserCardExplicit name="Alice" age={25} />
      <UserCardExplicit name="Bob" age={30} />
      <UserCardExplicit name="Clara" age={28} />
    </div>
  );
};

export default NearbyUsers;
