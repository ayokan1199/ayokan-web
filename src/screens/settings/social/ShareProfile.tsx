import React, { useState } from "react";

const ShareProfile: React.FC = () => {
  const [link] = useState("https://ayokan.app/user/12345");

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Lien copié dans le presse-papier !");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Partager mon profil</h1>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={link}
          readOnly
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Copier
        </button>
      </div>
    </div>
  );
};

export default ShareProfile;
