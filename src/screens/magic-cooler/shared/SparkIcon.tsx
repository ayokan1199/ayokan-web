import React from "react";

interface SparkIconProps {
  className?: string;
}

const SparkIcon: React.FC<SparkIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.5 7H22l-5.5 5 2 7L12 16 5.5 21l2-7L2 9h6.5L12 2z" />
    </svg>
  );
};

export default SparkIcon;
