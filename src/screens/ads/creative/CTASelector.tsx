import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CTA_OPTIONS = [
  "Learn More",
  "Shop Now",
  "Sign Up",
  "Download",
  "Contact Us",
];

const CTASelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Bouton d’action (CTA)</h2>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 w-full"
      >
        {CTA_OPTIONS.map((cta) => (
          <option key={cta} value={cta}>
            {cta}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CTASelector;
