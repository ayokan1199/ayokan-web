import React from "react";

const ReferralCode: React.FC = () => {
  const code = "AYOKAN-9F2A";

  return (
    <div className="border rounded-lg p-4 space-y-2">
      <h2 className="font-semibold">Ton code de parrainage</h2>

      <div className="flex justify-between items-center bg-gray-100 rounded-md p-2">
        <span className="font-mono">{code}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-blue-600 text-sm"
        >
          Copier
        </button>
      </div>
    </div>
  );
};

export default ReferralCode;
