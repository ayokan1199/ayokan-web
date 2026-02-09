import React from "react";

interface Props {
  collected: number;
  total: number;
}

const PassionPiecesCounter: React.FC<Props> = ({ collected, total }) => {
  return (
    <p className="text-gray-700 font-semibold">
      Pièces collectées: {collected} / {total}
    </p>
  );
};

export default PassionPiecesCounter;
