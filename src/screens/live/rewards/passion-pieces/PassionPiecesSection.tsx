import React from "react";
import PassionPieceItem from "./PassionPieceItem";
import PassionPiecesCounter from "./PassionPiecesCounter";

interface Piece {
  id: string;
  name: string;
  collected: boolean;
  imageUrl: string;
}

interface Props {
  pieces: Piece[];
}

const PassionPiecesSection: React.FC<Props> = ({ pieces }) => {
  const collectedCount = pieces.filter((p) => p.collected).length;

  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h3 className="text-xl font-bold">Pièces Passion</h3>

      <PassionPiecesCounter collected={collectedCount} total={pieces.length} />

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {pieces.map((piece) => (
          <PassionPieceItem key={piece.id} piece={piece} />
        ))}
      </div>
    </div>
  );
};

export default PassionPiecesSection;
