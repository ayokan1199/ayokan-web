import React from "react";

interface Props {
  label?: string;
  size?: number;
}

const FireBadge: React.FC<Props> = ({ label = "🔥", size = 24 }) => {
  return (
    <div
      className="inline-flex items-center justify-center bg-red-100 rounded-full p-1"
      style={{ width: size, height: size }}
      title={label}
    >
      <span style={{ fontSize: size * 0.8 }}>{label}</span>
    </div>
  );
};

export default FireBadge;
