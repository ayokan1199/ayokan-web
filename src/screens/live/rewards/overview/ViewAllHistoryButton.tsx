import React from "react";

interface Props {
  onClick: () => void;
}

const ViewAllHistoryButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow"
      onClick={onClick}
    >
      Voir tout l'historique
    </button>
  );
};

export default ViewAllHistoryButton;
