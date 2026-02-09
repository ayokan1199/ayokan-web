import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const DistanceFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block font-semibold mb-1">Distance (km): {value}</label>
      <input
        type="range"
        min={1}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default DistanceFilter;
