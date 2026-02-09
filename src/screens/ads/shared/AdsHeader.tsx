import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
}

const AdsHeader: React.FC<Props> = ({ title = "Gestion des Ads", subtitle }) => {
  return (
    <div className="bg-blue-600 text-white p-4 rounded shadow mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
    </div>
  );
};

export default AdsHeader;
