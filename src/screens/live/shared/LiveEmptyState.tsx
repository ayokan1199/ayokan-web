import React from "react";

interface Props {
  message?: string;
}

const LiveEmptyState: React.FC<Props> = ({ message = "Aucun live disponible pour le moment" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-gray-500">
      <div className="text-4xl mb-2">😔</div>
      <p>{message}</p>
    </div>
  );
};

export default LiveEmptyState;
