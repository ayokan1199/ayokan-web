import React from "react";

interface Props {
  hintText?: string;
}

const RankingActivationHint: React.FC<Props> = ({ hintText }) => {
  return (
    <div className="bg-gray-100 text-gray-600 p-3 rounded text-sm italic">
      {hintText || "Envoyez plus de cadeaux pour apparaître dans le classement !"}
    </div>
  );
};

export default RankingActivationHint;
