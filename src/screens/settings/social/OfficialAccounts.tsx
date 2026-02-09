import React from "react";

const officialAccounts = [
  { name: "Ayokan Officiel", username: "@ayokan" },
  { name: "Support", username: "@ayokan_support" },
  { name: "Communauté", username: "@ayokan_community" },
];

const OfficialAccounts: React.FC = () => {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Comptes officiels</h1>
      {officialAccounts.map((acc) => (
        <div
          key={acc.username}
          className="flex justify-between items-center p-3 border rounded-md"
        >
          <span>{acc.name}</span>
          <span className="text-gray-500">{acc.username}</span>
        </div>
      ))}
    </div>
  );
};

export default OfficialAccounts;
