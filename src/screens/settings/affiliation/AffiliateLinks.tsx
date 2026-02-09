import React from "react";

const links = [
  { label: "Lien général", url: "https://ayokan.app/?ref=USER123" },
  { label: "Lien Premium", url: "https://ayokan.app/premium?ref=USER123" },
];

const AffiliateLinks: React.FC = () => {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-semibold">Tes liens d’affiliation</h2>

      {links.map((link) => (
        <div key={link.label} className="space-y-1">
          <p className="text-sm">{link.label}</p>
          <div className="flex justify-between bg-gray-100 p-2 rounded-md">
            <span className="text-xs truncate">{link.url}</span>
            <button
              onClick={() => navigator.clipboard.writeText(link.url)}
              className="text-blue-600 text-xs"
            >
              Copier
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AffiliateLinks;
