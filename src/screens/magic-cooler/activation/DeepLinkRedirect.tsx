import React, { useEffect } from "react";

interface Props {
  url: string;
}

const DeepLinkRedirect: React.FC<Props> = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <div className="p-4 bg-yellow-50 rounded shadow text-center">
      <p className="text-yellow-700 font-semibold">Redirection en cours...</p>
    </div>
  );
};

export default DeepLinkRedirect;
