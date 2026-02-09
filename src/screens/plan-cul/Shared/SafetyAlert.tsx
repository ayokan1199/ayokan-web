import React from "react";

interface SafetyAlertProps {
  message: string;
  type?: "info" | "warning" | "danger";
}

const SafetyAlert: React.FC<SafetyAlertProps> = ({ message, type = "info" }) => {
  const color = {
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  }[type];

  return (
    <div className={`p-3 rounded shadow ${color} text-sm font-medium`}>
      {message}
    </div>
  );
};

export default SafetyAlert;
