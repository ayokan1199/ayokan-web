import React from "react";

interface IceBadgeProps {
  label: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-sm px-2 py-1",
  md: "text-base px-3 py-1.5",
  lg: "text-lg px-4 py-2",
};

const IceBadge: React.FC<IceBadgeProps> = ({ label, size = "md" }) => {
  return (
    <span className={`bg-blue-200 text-blue-800 rounded-full font-semibold ${sizeClasses[size]}`}>
      {label}
    </span>
  );
};

export default IceBadge;
