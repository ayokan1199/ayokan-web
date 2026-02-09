import React from "react";
import MarkdownScreen from "./MarkdownScreen";
import content from "../md/dmca-copyright.md?raw";

const DMCA_CopyrightScreen: React.FC = () => {
  return <MarkdownScreen title="DMCA / Copyright" content={content} />;
};

export default DMCA_CopyrightScreen;
