import React from "react";

interface Props {
  onClose: () => void;
}

const MatchRulesModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded shadow p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Règles du Match Express</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Vous devez être +18 pour utiliser le service.</li>
          <li>Respectez la vie privée et le consentement de l’autre.</li>
          <li>Aucune diffusion de contenus explicites en dehors de la plateforme.</li>
          <li>Comportement respectueux requis dans les chats et lives.</li>
        </ul>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default MatchRulesModal;
