import React from "react";

interface Props {
  verified: boolean;
}

const VerificationBadge: React.FC<Props> = ({ verified }) => {
  if (!verified) return null;
  return (
    <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded-full font-semibold">
      Vérifié
    </span>
  );
};

export default VerificationBadge;
