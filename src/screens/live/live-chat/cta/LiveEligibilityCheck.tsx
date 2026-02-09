import React from "react";

interface Props {
  eligible: boolean;
}

const LiveEligibilityCheck: React.FC<Props> = ({ eligible }) => {
  if (eligible) return null;

  return (
    <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
      You are not eligible to start a live yet.
    </div>
  );
};

export default LiveEligibilityCheck;
