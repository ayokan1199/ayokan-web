import React from "react";

interface Props {
  label: string;
  color?: "green" | "red" | "blue" | "yellow";
}

const badgeColors = {
  green: "bg-green-500 text-white",
  red: "bg-red-500 text-white",
  blue: "bg-blue-500 text-white",
  yellow: "bg-yellow-400 text-black",
};

const AdsBadge: React.FC<Props> = ({ label, color = "blue" }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[color]}`}>
      {label}
    </span>
  );
};

export default AdsBadge;
