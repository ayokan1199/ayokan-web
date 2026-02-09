import React from "react";

interface BadgeProps {
  label: string;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
  return <span className="px-2 py-0.5 text-xs bg-yellow-500 rounded">{label}</span>;
};

export default Badge;
