import React from "react";

const ShareContent: React.FC = () => {
  const handleShare = (platform: string) => {
    alert(`Partager sur ${platform} !`);
  };

  const platforms = ["Instagram", "TikTok", "X (Twitter)", "Facebook", "YouTube"];

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Partager du contenu</h1>
      <div className="flex flex-col gap-3">
        {platforms.map((plat) => (
          <button
            key={plat}
            onClick={() => handleShare(plat)}
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Partager sur {plat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareContent;
