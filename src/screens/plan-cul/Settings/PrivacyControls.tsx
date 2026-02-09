import React, { useState } from "react";

const PrivacyControls: React.FC = () => {
  const [hideProfile, setHideProfile] = useState(false);
  const [disableMessages, setDisableMessages] = useState(false);

  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <h2 className="font-semibold text-lg">Confidentialité & messages</h2>
      
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={hideProfile}
          onChange={() => setHideProfile(!hideProfile)}
        />
        <span>Masquer mon profil aux autres utilisateurs</span>
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={disableMessages}
          onChange={() => setDisableMessages(!disableMessages)}
        />
        <span>Désactiver la réception de messages</span>
      </label>
    </div>
  );
};

export default PrivacyControls;
