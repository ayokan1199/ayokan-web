import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  filePath: string;
}

const LegalScreen: React.FC<Props> = ({ filePath }) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.text())
      .then(setContent)
      .catch((err) => console.error("Erreur lecture fichier :", err));
  }, [filePath]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default LegalScreen;
