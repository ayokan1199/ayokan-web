import React, { useState } from "react";
import SettingsSection from "./SettingsSection";
import SettingsItem from "./SettingsItem";
import SettingsSearch from "./SettingsSearch";

interface SettingsItemData {
  label: string;
  screen: string;
}

interface SettingsSectionData {
  title: string;
  items: SettingsItemData[];
}

const settingsSections: SettingsSectionData[] = [
  {
    title: "Compte",
    items: [
      { label: "Langue", screen: "LanguageSelector" },
      { label: "Changer de compte", screen: "SwitchAccount" },
      { label: "Supprimer mon compte", screen: "DeleteAccount" },
    ],
  },
  {
    title: "Confidentialité & sécurité",
    items: [
      { label: "Visibilité", screen: "VisibilityControls" },
      { label: "Contenu explicite", screen: "ContentPreferences" },
      { label: "Auth. à deux facteurs", screen: "TwoFactorAuth" },
    ],
  },
  {
    title: "Monétisation",
    items: [
      { label: "Étincelles", screen: "SparkWallet" },
      { label: "Abonnements", screen: "Subscriptions" },
      { label: "Historique gains", screen: "EarningsSummary" },
    ],
  },
  {
    title: "Partenariats & affiliation",
    items: [
      { label: "Devenir partenaire", screen: "BecomePartner" },
      { label: "Collab. marques & créateurs", screen: "BrandCollabs" },
      { label: "Programme d’affiliation", screen: "AffiliateHistory" },
    ],
  },
  {
    title: "Partager Ayokan",
    items: [
      { label: "Partager app", screen: "ShareApp" },
      { label: "Inviter des amis", screen: "ReferralScreen" },
    ],
  },
  {
    title: "Réseaux sociaux",
    items: [
      { label: "Instagram", screen: "SocialInstagram" },
      { label: "TikTok", screen: "SocialTikTok" },
      { label: "X (Twitter)", screen: "SocialX" },
      { label: "Facebook", screen: "SocialFacebook" },
      { label: "YouTube", screen: "SocialYouTube" },
      { label: "Telegram / Discord", screen: "SocialTelegram" },
    ],
  },
  {
    title: "Support & légal",
    items: [
      { label: "Centre d’aide", screen: "HelpCenter" },
      { label: "Contact support", screen: "ContactSupport" },
      { label: "CGU / Politique", screen: "LegalScreen" },
    ],
  },
];

const SettingsHomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");

  const filteredSections = settingsSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  const handleNavigate = (screen: string) => {
    // TODO: remplacer par navigation réelle
    console.log("Navigate to:", screen);
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <SettingsSearch value={search} onChange={setSearch} />

      {filteredSections.length === 0 ? (
        <p className="text-gray-500 text-center">Aucun paramètre trouvé.</p>
      ) : (
        filteredSections.map((section) => (
          <SettingsSection key={section.title} title={section.title}>
            {section.items.map((item) => (
              <SettingsItem
                key={item.label}
                label={item.label}
                onClick={() => handleNavigate(item.screen)}
              />
            ))}
          </SettingsSection>
        ))
      )}
    </div>
  );
};

export default SettingsHomeScreen;
