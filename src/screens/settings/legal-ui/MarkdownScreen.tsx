import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownScreenProps {
  title: string;
  content: string;
}

const MarkdownScreen: React.FC<MarkdownScreenProps> = ({ title, content }) => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownScreen;
