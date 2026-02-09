import React from "react";

interface Props {
  size?: number;
}

const AnimatedFlame: React.FC<Props> = ({ size = 30 }) => {
  return (
    <span
      className="animate-pulse inline-block"
      style={{ fontSize: size, color: "orange" }}
      role="img"
      aria-label="flame"
    >
      🔥
    </span>
  );
};

export default AnimatedFlame;
