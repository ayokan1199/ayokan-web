import React from "react";
import { useNavigate } from "react-router-dom";
import SupportItem from "./SupportItem";

const SupportScreen: React.FC = () => {
  const navigate = useNavigate();

  const supportOptions = [
    { label: "Centre d'aide", screen: "/help-center" },
    { label: "Contact support", screen: "/contact-support" },
    { label: "Signaler un problème", screen: "/report-problem" },
    { label: "Donner un feedback", screen: "/feedback" },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Support & Assistance</h1>
      <p className="text-gray-700">
        Nous sommes là pour vous aider. Choisissez une option ci-dessous :
      </p>

      <div className="space-y-2">
        {supportOptions.map((item) => (
          <SupportItem
            key={item.label}
            label={item.label}
            onClick={() => navigate(item.screen)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupportScreen;
