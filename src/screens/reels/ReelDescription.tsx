import React, { useState } from "react";

interface ReelDescriptionProps {
  description: string;
}

const ReelDescription: React.FC<ReelDescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p>{expanded ? description : `${description.slice(0, 100)}...`}</p>
      {description.length > 100 && (
        <button className="text-blue-400" onClick={() => setExpanded(!expanded)}>
          Voir plus
        </button>
      )}
    </div>
  );
};

export default ReelDescription;
