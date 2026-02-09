import React from "react";

interface Props {
  id: string;
  name: string;
  icon: string;
  collected: boolean;
  onClick?: (id: string) => void;
}

const PassionPieceItem: React.FC<Props> = ({ id, name, icon, collected, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center p-2 border rounded cursor-pointer ${
        collected ? "opacity-100" : "opacity-40"
      }`}
      onClick={() => onClick?.(id)}
    >
      <img src={icon} alt={name} className="w-12 h-12 mb-1" />
      <span className="text-xs font-semibold">{name}</span>
    </div>
  );
};

export default PassionPieceItem;
