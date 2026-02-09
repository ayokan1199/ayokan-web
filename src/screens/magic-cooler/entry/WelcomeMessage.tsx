import React from "react";

interface Props {
  userName: string;
}

const WelcomeMessage: React.FC<Props> = ({ userName }) => {
  return (
    <div className="text-center mt-4">
      <h1 className="text-3xl font-bold text-blue-600">
        Bienvenue dans la Glacière Magique, {userName} 😏
      </h1>
    </div>
  );
};

export default WelcomeMessage;
