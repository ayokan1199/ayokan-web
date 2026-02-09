import React, { useState } from "react";
import PassionPieceItem from "./PassionPieceItem";

interface Piece {
  id: string;
  name: string;
  collected: boolean;
  imageUrl: string;
}

interface Props {
  pieces: Piece[];
  onComplete?: () => void;
}

const PassionPuzzle: React.FC<Props> = ({ pieces, onComplete }) => {
  const [solvedPieces, setSolvedPieces] = useState<number>(
    pieces.filter((p) => p.collected).length
  );

  const handlePieceClick = () => {
    if (solvedPieces < pieces.length) {
      setSolvedPieces((prev) => prev + 1);
      if (solvedPieces + 1 === pieces.length) {
        onComplete?.();
      }
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h3 className="font-bold text-lg">Puzzle Passion</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {pieces.map((piece) => (
          <div key={piece.id} onClick={handlePieceClick}>
            <PassionPieceItem piece={{ ...piece, collected: true }} />
          </div>
        ))}
      </div>
      <p className="text-gray-600">
        Pièces résolues: {solvedPieces} / {pieces.length}
      </p>
    </div>
  );
};

export default PassionPuzzle;
