import React from "react";

const TaxDocuments: React.FC = () => {
  const documents = [
    { id: "1", name: "Formulaire W-9", uploaded: true },
    { id: "2", name: "Certificat TVA", uploaded: false },
  ];

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold">Documents fiscaux</h2>
      {documents.map((doc) => (
        <div key={doc.id} className="flex justify-between items-center p-2 border rounded">
          <span>{doc.name}</span>
          <span className={doc.uploaded ? "text-green-600" : "text-red-500"}>
            {doc.uploaded ? "Téléversé ✅" : "Manquant ❌"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaxDocuments;
