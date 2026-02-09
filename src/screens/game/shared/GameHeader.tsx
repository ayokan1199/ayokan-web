import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

const GameHeader: React.FC<Props> = ({ title, subtitle, rightElement }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow rounded">
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default GameHeader;
