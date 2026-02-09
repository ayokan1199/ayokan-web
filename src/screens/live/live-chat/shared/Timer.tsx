import React from "react";

interface Props {
  seconds: number;
}

const Timer: React.FC<Props> = ({ seconds }) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return (
    <span className="text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded">
      {minutes}:{remaining.toString().padStart(2, "0")}
    </span>
  );
};

export default Timer;
