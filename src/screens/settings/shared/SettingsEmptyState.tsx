import React from "react";

interface Props {
  message: string;
}

const SettingsEmptyState: React.FC<Props> = ({ message }) => (
  <div className="text-center p-6 text-gray-500">{message}</div>
);

export default SettingsEmptyState;
