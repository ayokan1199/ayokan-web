import React from "react";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

const AvailabilityFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        id="availability"
      />
      <label htmlFor="availability" className="font-semibold">
        Disponible maintenant
      </label>
    </div>
  );
};

export default AvailabilityFilter;
