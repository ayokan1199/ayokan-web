import React from "react";

interface Props {
  label: string;
  url: string;
}

const ExternalLinkItem: React.FC<Props> = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 border-b hover:bg-gray-50"
  >
    {label}
  </a>
);

export default ExternalLinkItem;
