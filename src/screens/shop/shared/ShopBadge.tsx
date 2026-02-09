import React from "react";

interface ShopBadgeProps {
  label: string;
  color?: string;
}

const ShopBadge: React.FC<ShopBadgeProps> = ({ label, color = "bg-blue-500" }) => {
  return (
    <span className={`${color} text-white text-xs font-semibold px-2 py-1 rounded`}>
      {label}
    </span>
  );
};

export default ShopBadge;
