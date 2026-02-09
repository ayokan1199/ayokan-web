import React from "react";

const benefits = [
  "Private live streams",
  "Exclusive badges",
  "Priority chat messages",
  "Special gifts & rewards",
];

const FanClubBenefits: React.FC = () => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-2">Fan Club Benefits</h3>

      <ul className="list-disc list-inside text-sm space-y-1">
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default FanClubBenefits;
