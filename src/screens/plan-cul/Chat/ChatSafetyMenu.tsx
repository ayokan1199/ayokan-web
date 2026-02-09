import React from "react";

const ChatSafetyMenu: React.FC = () => {
  const blockUser = () => alert("Utilisateur bloqué !");
  const reportUser = () => alert("Utilisateur signalé !");

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={blockUser}
        className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Bloquer
      </button>
      <button
        onClick={reportUser}
        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Signaler
      </button>
    </div>
  );
};

export default ChatSafetyMenu;
