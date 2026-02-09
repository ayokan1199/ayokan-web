import React from "react";
import { useAuth } from "../auth/AuthContext";
import BluezoneEntryScreen from "./entry/BluezoneEntryScreen";

const BluezoneGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { bluezoneEnabled } = useAuth();

  if (!bluezoneEnabled) {
    return <BluezoneEntryScreen />;
  }

  return <>{children}</>;
};

export default BluezoneGate;
