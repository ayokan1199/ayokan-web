import React from "react";

interface Props {
  message?: string;
}

const RewardEmptyState: React.FC<Props> = ({
  message = "Aucune récompense disponible pour le moment.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded">
      <span className="text-4xl mb-3">🎁</span>
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
};

export default RewardEmptyState;
