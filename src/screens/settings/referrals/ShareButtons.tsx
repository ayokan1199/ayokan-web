import React from "react";

const ShareButtons: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold">Partager Ayokan</h2>

      <div className="grid grid-cols-2 gap-2">
        <button className="border rounded-md p-2 text-sm">Instagram</button>
        <button className="border rounded-md p-2 text-sm">WhatsApp</button>
        <button className="border rounded-md p-2 text-sm">Messenger</button>
        <button className="border rounded-md p-2 text-sm">Copier le lien</button>
      </div>
    </div>
  );
};

export default ShareButtons;
