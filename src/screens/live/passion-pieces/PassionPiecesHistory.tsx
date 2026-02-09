import React from "react";

interface Record {
  id: string;
  pieceName: string;
  timestamp: string;
}

interface Props {
  history: Record[];
}

const PassionPiecesHistory: React.FC<Props> = ({ history }) => {
  return (
    <div className="p-2 max-h-64 overflow-y-auto bg-gray-50 rounded space-y-1 text-sm">
      {history.map((h) => (
        <div key={h.id} className="flex justify-between">
          <span>{h.pieceName}</span>
          <span className="text-gray-400">{h.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default PassionPiecesHistory;
