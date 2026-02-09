import React from "react";

interface Props {
  tips: string[];
}

const LivePerformanceTips: React.FC<Props> = ({ tips }) => {
  return (
    <div className="bg-white rounded shadow p-4 text-sm space-y-1">
      <h4 className="font-semibold mb-2">Conseils pour améliorer votre LIVE</h4>
      <ul className="list-disc list-inside">
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default LivePerformanceTips;
