import React from "react";

interface AvatarProps {
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ size = 50 }) => {
  return <div className={`w-${size} h-${size} rounded-full bg-gray-300`} />;
};

export default Avatar;
