// screens/bluezone/consent/BluezoneConsentScreen.tsx
import React, { useState } from "react";

type Orientation = "gay" | "lesbian" | "bi";

const BluezoneConsentScreen: React.FC<{ onValidate?: () => void }> = ({
  onValidate,
}) => {
  const [orientation, setOrientation] = useState<Orientation | null>(null);

  const [consents, setConsents] = useState({
    community: false,
    respect: false,
    visibility: false,
  });

  const allValid =
    orientation !== null &&
    consents.community &&
    consents.respect &&
    consents.visibility;

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Accès à la communauté BlueZone
      </h1>

      {/* Orientation */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Je m’identifie comme :</p>

        <div className="space-y-2">
          {[
            { label: "Gay", value: "gay" },
            { label: "Lesbienne", value: "lesbian" },
            { label: "Bisexuel(le)", value: "bi" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="orientation"
                value={opt.value}
                checked={orientation === opt.value}
                onChange={() => setOrientation(opt.value as Orientation)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Consentements */}
      <div className="mb-8 space-y-3">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={consents.community}
            onChange={(e) =>
              setConsents({ ...consents, community: e.target.checked })
            }
          />
          <span>
            Je confirme appartenir à cette communauté ou y être légitimement
            concerné(e).
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={consents.respect}
            onChange={(e) =>
              setConsents({ ...consents, respect: e.target.checked })
            }
          />
          <span>
            Je m’engage à respecter les règles de bienveillance et de respect.
          </span>
        </label>

        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={consents.visibility}
            onChange={(e) =>
              setConsents({ ...consents, visibility: e.target.checked })
            }
          />
          <span>
            J’accepte que mon profil soit visible uniquement au sein de BlueZone.
          </span>
        </label>
      </div>

      {/* Action */}
      <button
        disabled={!allValid}
        onClick={onValidate}
        className={`w-full py-3 rounded-full font-semibold transition ${
          allValid
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-gray-700 opacity-50 cursor-not-allowed"
        }`}
      >
        Accéder à BlueZone
      </button>
    </div>
  );
};

export default BluezoneConsentScreen;
