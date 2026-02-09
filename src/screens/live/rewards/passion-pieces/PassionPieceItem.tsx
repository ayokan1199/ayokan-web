import React from "react";

interface Piece {
  id: string;
  name: string;
  collected: boolean;
  imageUrl: string;
}

interface Props {
  piece: Piece;
}

const PassionPieceItem: React.FC<Props> = ({ piece }) => {
  return (
    <div className={`border rounded p-1 flex items-center justify-center ${piece.collected ? "bg-yellow-100" : "bg-gray-200"}`}>
      <img src={piece.imageUrl} alt={piece.name} className="w-12 h-12 object-cover" />
    </div>
  );
};

export default PassionPieceItem;
