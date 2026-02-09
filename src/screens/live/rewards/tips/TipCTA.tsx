import React from "react";

interface Props {
  tipId: string;
}

const TipCTA: React.FC<Props> = ({ tipId }) => {
  const handleClick = () => {
    alert(`Action pour le conseil ${tipId} déclenchée !`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-1 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600"
    >
      Essayer maintenant
    </button>
  );
};

export default TipCTA;
