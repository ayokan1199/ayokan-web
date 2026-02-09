import React from "react";

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="font-bold">{value}</span>
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
};

export default StatCard;
