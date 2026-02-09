import React from "react";

interface PlanCulEmptyStateProps {
  message?: string;
}

const PlanCulEmptyState: React.FC<PlanCulEmptyStateProps> = ({
  message = "Aucun contenu à afficher pour le moment.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500 space-y-2">
      <div className="text-6xl">😴</div>
      <p>{message}</p>
    </div>
  );
};

export default PlanCulEmptyState;
