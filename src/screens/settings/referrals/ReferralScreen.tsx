import React from "react";
import ReferralCode from "./ReferralCode";
import ShareButtons from "./ShareButtons";
import ReferralRewards from "./ReferralRewards";
import ReferralHistory from "./ReferralHistory";

const ReferralScreen: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">
        Inviter des amis & gagner des récompenses
      </h1>

      <p className="text-gray-600 text-sm">
        Invite tes amis sur Ayokan.  
        Lorsqu’ils s’inscrivent et deviennent actifs, tu gagnes des Étincelles ✨
      </p>

      <ReferralCode />
      <ShareButtons />
      <ReferralRewards />
      <ReferralHistory />
    </div>
  );
};

export default ReferralScreen;
