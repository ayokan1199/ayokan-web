import React, { useState } from "react";
import PassionPieceItem from "./PassionPieceItem";
import PassionPuzzleProgress from "./PassionPuzzleProgress";
import PassionBonusCard from "./PassionBonusCard";
import PassionPiecesHistory from "./PassionPiecesHistory";

interface Piece {
  id: string;
  name: string;
  icon: string;
  collected: boolean;
}

const mockPieces: Piece[] = [
  { id: "p1", name: "Pièce A", icon: "/icons/pieceA.png", collected: true },
  { id: "p2", name: "Pièce B", icon: "/icons/pieceB.png", collected: false },
  { id: "p3", name: "Pièce C", icon: "/icons/pieceC.png", collected: true },
];

const mockHistory = [
  { id: "h1", pieceName: "Pièce A", timestamp: "2026-01-16 12:00" },
  { id: "h2", pieceName: "Pièce C", timestamp: "2026-01-16 12:05" },
];

const PassionPiecesScreen: React.FC = () => {
  const [pieces, setPieces] = useState(mockPieces);

  const collectedCount = pieces.filter((p) => p.collected).length;
  const progress = Math.floor((collectedCount / pieces.length) * 100);

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-bold">Pièces Passion</h2>

      {/* Progression puzzle */}
      <PassionPuzzleProgress progress={progress} />

      {/* Pièces */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {pieces.map((p) => (
          <PassionPieceItem key={p.id} {...p} />
        ))}
      </div>

      {/* Bonus */}
      <div className="space-y-2 mt-4">
        <PassionBonusCard bonus="50 Sparks gagnés" />
      </div>

      {/* Historique */}
      <PassionPiecesHistory history={mockHistory} />
    </div>
  );
};

export default PassionPiecesScreen;
