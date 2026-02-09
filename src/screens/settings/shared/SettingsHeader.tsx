import React from "react";

interface Props {
  title: string;
  subtitle?: string;
}

const SettingsHeader: React.FC<Props> = ({ title, subtitle }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-bold">{title}</h1>
    {subtitle && <p className="text-gray-500">{subtitle}</p>}
  </div>
);

export default SettingsHeader;
