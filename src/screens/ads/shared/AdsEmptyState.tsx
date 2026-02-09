import React from "react";

interface Props {
  message?: string;
}

const AdsEmptyState: React.FC<Props> = ({ message = "Aucun élément à afficher." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
      <svg
        className="w-16 h-16 mb-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
      </svg>
      <p>{message}</p>
    </div>
  );
};

export default AdsEmptyState;
