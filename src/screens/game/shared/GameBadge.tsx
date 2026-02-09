import React from "react";

interface Props {
  label: string;
  color?: string;
}

const GameBadge: React.FC<Props> = ({ label, color = "bg-yellow-400" }) => {
  return (
    <span className={`text-xs px-2 py-1 rounded-full text-white font-semibold ${color}`}>
      {label}
    </span>
  );
};

export default GameBadge;
