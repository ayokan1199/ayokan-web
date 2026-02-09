import React from "react";

const ComplianceStatus: React.FC = () => {
  const complianceItems = [
    { id: 1, name: "Politique publicitaire respectée", status: true },
    { id: 2, name: "Contenu adulte restreint", status: true },
    { id: 3, name: "Données utilisateur sécurisées", status: false },
  ];

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      {complianceItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <span>{item.name}</span>
          <span className={`font-semibold ${item.status ? "text-green-600" : "text-red-600"}`}>
            {item.status ? "✅" : "❌"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ComplianceStatus;
