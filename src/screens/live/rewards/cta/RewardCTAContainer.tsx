import React from "react";
import ClaimRewardButton from "./ClaimRewardButton";
import ClaimAllButton from "./ClaimAllButton";

interface Props {
  onClaim: () => void;
  onClaimAll: () => void;
  hasMultipleRewards?: boolean;
}

const RewardCTAContainer: React.FC<Props> = ({ onClaim, onClaimAll, hasMultipleRewards = false }) => {
  return (
    <div className="flex gap-3">
      <ClaimRewardButton onClaim={onClaim} />
      {hasMultipleRewards && <ClaimAllButton onClaimAll={onClaimAll} />}
    </div>
  );
};

export default RewardCTAContainer;
