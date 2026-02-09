import React, { useState } from "react";

const BlockUser: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleBlock = () => {
    if (!username) return alert("Veuillez entrer le nom de l’utilisateur.");
    alert(`Utilisateur ${username} bloqué.`);
    setUsername("");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold text-lg">Bloquer un utilisateur</h2>
      <input
        type="text"
        placeholder="Nom de l'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border rounded p-2"
      />
      <button
        onClick={handleBlock}
        className="w-full py-2 mt-2 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        Bloquer
      </button>
    </div>
  );
};

export default BlockUser;
