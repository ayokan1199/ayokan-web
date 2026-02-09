import React from "react";

interface Props {
  text: string;
  color?: string;
}

const SettingsBadge: React.FC<Props> = ({ text, color = "bg-blue-500" }) => (
  <span className={`px-2 py-1 text-white rounded ${color} text-sm`}>
    {text}
  </span>
);

export default SettingsBadge;
