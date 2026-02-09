import React from "react";

const ConsentReminder: React.FC = () => {
  return (
    <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
      ⚠️ Rappel : Ce chat est réservé aux +18. Respectez toujours le consentement.
    </div>
  );
};

export default ConsentReminder;
