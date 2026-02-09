import React from "react";
import FanClubSubscription from "./FanClubSubscription";
import FanClubBenefits from "./FanClubBenefits";
import PrivateLiveList from "./PrivateLiveList";

const FanClubScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Fan Club</h1>

      <FanClubSubscription />
      <FanClubBenefits />
      <PrivateLiveList />
    </div>
  );
};

export default FanClubScreen;
