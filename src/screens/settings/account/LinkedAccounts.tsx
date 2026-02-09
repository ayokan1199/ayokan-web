import React from "react";

const providers = ["Google", "Apple", "Facebook"];

const LinkedAccounts: React.FC = () => {
  return (
    <div className="space-y-2">
      {providers.map((p) => (
        <button key={p} className="settings-item">
          Connecté avec {p}
        </button>
      ))}
    </div>
  );
};

export default LinkedAccounts;
