import React from "react";

interface Source {
  name: string;
  count: number;
}

interface Props {
  sources: Source[];
}

const LiveTrafficSources: React.FC<Props> = ({ sources }) => {
  return (
    <div className="bg-white rounded shadow p-4 text-sm">
      <h4 className="font-semibold mb-2">Sources de trafic</h4>
      <ul className="space-y-1">
        {sources.map((s, i) => (
          <li key={i} className="flex justify-between">
            <span>{s.name}</span>
            <span>{s.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveTrafficSources;
