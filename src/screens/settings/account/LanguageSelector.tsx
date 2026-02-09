import React, { useState } from "react";

interface Language {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },

];

const LanguageSelector: React.FC = () => {
  const [selected, setSelected] = useState<string>("fr");

  const handleChange = (code: string) => {
    setSelected(code);

    // 🔗 À brancher plus tard (i18n / backend)
    console.log("Langue sélectionnée :", code);
  };

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-semibold">Langue</h2>

      <div className="space-y-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`w-full flex items-center justify-between p-3 border rounded-lg transition
              ${
                selected === lang.code
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.label}</span>
            </span>

            {selected === lang.code && (
              <span className="text-blue-600 font-semibold">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
