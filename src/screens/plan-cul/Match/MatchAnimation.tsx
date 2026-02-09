import React from "react";

interface Props {
  userName: string;
}

const MatchAnimation: React.FC<Props> = ({ userName }) => {
  return (
    <div className="my-4 p-6 bg-pink-100 rounded shadow text-center">
      <p className="text-xl font-bold">💖 Match trouvé !</p>
      <p className="mt-2 text-lg">Vous avez rencontré {userName}.</p>
    </div>
  );
};

export default MatchAnimation;
