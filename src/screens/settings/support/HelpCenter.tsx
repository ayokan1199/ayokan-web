import React from "react";

const HelpCenter: React.FC = () => {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Centre d'aide</h1>
      <p className="text-gray-700">
        Trouvez des réponses rapides à vos questions et des guides d'utilisation.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Créer et gérer votre compte</li>
        <li>Paramètres de confidentialité et sécurité</li>
        <li>Gérer vos abonnements et vos gains</li>
        <li>Interagir avec la communauté</li>
        <li>Résoudre des problèmes techniques courants</li>
      </ul>
    </div>
  );
};

export default HelpCenter;
