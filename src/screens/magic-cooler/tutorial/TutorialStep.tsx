import React from "react";

interface Props {
  stepNumber: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const TutorialStep: React.FC<Props> = ({ stepNumber, title, description, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-start space-x-4">
      <div className="text-blue-500 font-bold text-xl">{stepNumber}.</div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          {icon && <div>{icon}</div>}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default TutorialStep;
