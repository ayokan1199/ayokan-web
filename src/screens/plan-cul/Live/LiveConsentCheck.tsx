import React, { useState } from "react";

const LiveConsentCheck: React.FC = () => {
  const [consent, setConsent] = useState(false);

  return (
    <div className="p-3 mb-4 bg-yellow-100 border-l-4 border-yellow-500 rounded text-yellow-700">
      {!consent ? (
        <div>
          <p>⚠️ Vous devez accepter les conditions pour accéder aux lives +18.</p>
          <button
            onClick={() => setConsent(true)}
            className="mt-2 px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Accepter
          </button>
        </div>
      ) : (
        <p>✅ Consentement accepté. Vous pouvez regarder les lives.</p>
      )}
    </div>
  );
};

export default LiveConsentCheck;
