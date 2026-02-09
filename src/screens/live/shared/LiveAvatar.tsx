import React from "react";

interface Props {
  src?: string;
  size?: number;
}

const LiveAvatar: React.FC<Props> = ({ src, size = 40 }) => {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt="avatar"
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  );
};

export default LiveAvatar;
