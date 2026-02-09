import React from "react";
import LiveStatsHeader from "./LiveStatsHeader";
import LiveChallengeProgress from "./LiveChallengeProgress";
import LivePassionPiecesGain from "./LivePassionPiecesGain";
import LiveInvitePanel from "./LiveInvitePanel";
import LiveCreatorActions from "./LiveCreatorActions";
import LiveCreatorOptions from "./LiveCreatorOptions";

const LiveCreatorScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <LiveStatsHeader />
      <LiveChallengeProgress />
      <LivePassionPiecesGain />
      <LiveInvitePanel />
      <LiveCreatorActions />
      <LiveCreatorOptions />
    </div>
  );
};

export default LiveCreatorScreen;
