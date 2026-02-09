import React from "react";
import InviteFriendsList from "./InviteFriendsList";
import InviteMatchList from "./InviteMatchList";
import InviteStatus from "./InviteStatus";
import InviteHistory from "./InviteHistory";

const GameInviteScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="font-bold text-xl mb-2">Invitations de jeu</h2>
      <InviteFriendsList />
      <InviteMatchList />
      <InviteStatus />
      <InviteHistory />
    </div>
  );
};

export default GameInviteScreen;
