import React from "react";
import { Link } from "react-router-dom"; // ou ton système de navigation

const LegalHubScreen: React.FC = () => {
  const legalItems = [
    { title: "Conditions d'utilisation", path: "/legal/terms" },
    { title: "Politique de confidentialité", path: "/legal/privacy" },
    { title: "Guidelines communauté", path: "/legal/community-guidelines" },
    { title: "Politique de contenu", path: "/legal/content-policy" },
    { title: "Politique live", path: "/legal/live-policy" },
    { title: "Politique paiement", path: "/legal/payment-policy" },
    { title: "Politique publicité", path: "/legal/advertising-policy" },
    { title: "Politique chat", path: "/legal/chat-policy" },
    { title: "Politique cookies", path: "/legal/cookie-policy" },
    { title: "DMCA / Copyright", path: "/legal/dmca" },
    { title: "Politique remboursement", path: "/legal/refund" },
    { title: "Contact légal", path: "/legal/contact" },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Légal</h1>
      <ul className="space-y-2">
        {legalItems.map((item) => (
          <li key={item.title}>
            <Link
              to={item.path}
              className="text-blue-500 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LegalHubScreen;
