import React from "react";

interface Props {
  value: number;
}

const ProgressBar: React.FC<Props> = ({ value }) => {
  return (
    <div className="h-2 bg-gray-200 rounded overflow-hidden">
      <div
        className="h-full bg-blue-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ProgressBar;
