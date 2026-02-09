import React from "react";
import GoLiveButton from "./GoLiveButton";
import LiveEligibilityCheck from "./LiveEligibilityCheck";

const LiveCTAContainer: React.FC = () => {
  const eligible = true;

  return (
    <div className="space-y-2">
      <LiveEligibilityCheck eligible={eligible} />
      {eligible && <GoLiveButton />}
    </div>
  );
};

export default LiveCTAContainer;
