import React from "react";

interface Props {
  label: string;
  color?: string;
}

const LiveBadge: React.FC<Props> = ({ label, color = "bg-yellow-400" }) => {
  return (
    <span className={`px-2 py-1 text-xs text-white rounded-full font-semibold ${color}`}>
      {label}
    </span>
  );
};

export default LiveBadge;
