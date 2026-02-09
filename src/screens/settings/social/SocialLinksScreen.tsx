import React from "react";
import SocialAccount from "./SocialAccount"; // <- le composant générique

const SocialLinksScreen: React.FC = () => {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Mes comptes sociaux</h1>
      <SocialAccount platform="Instagram" />
      <SocialAccount platform="TikTok" />
      <SocialAccount platform="X (Twitter)" />
      <SocialAccount platform="Facebook" />
      <SocialAccount platform="YouTube" />
      <SocialAccount platform="Telegram / Discord" />
    </div>
  );
};

export default SocialLinksScreen;
