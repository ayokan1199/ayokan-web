import React from "react";

interface Props {
  url?: string;
}

const RulesLink: React.FC<Props> = ({ url }) => {
  return (
    <p className="text-gray-500 text-sm italic">
      Consultez les{" "}
      <a
        href={url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 underline"
      >
        règles et conseils officiels
      </a>
      .
    </p>
  );
};

export default RulesLink;
