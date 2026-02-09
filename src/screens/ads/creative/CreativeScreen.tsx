import React, { useState } from "react";
import CreativeUploader from "./CreativeUploader";
import CreativePreview from "./CreativePreview";
import AdCopyEditor from "./AdCopyEditor";
import CTASelector from "./CTASelector";

export interface CreativeData {
  mediaUrl?: string;
  headline: string;
  description: string;
  cta: string;
}

const CreativeScreen: React.FC = () => {
  const [creative, setCreative] = useState<CreativeData>({
    headline: "",
    description: "",
    cta: "Learn More",
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Créatif publicitaire</h1>

      <CreativeUploader
        mediaUrl={creative.mediaUrl}
        onUpload={(mediaUrl) =>
          setCreative({ ...creative, mediaUrl })
        }
      />

      <AdCopyEditor
        headline={creative.headline}
        description={creative.description}
        onChange={(data) => setCreative({ ...creative, ...data })}
      />

      <CTASelector
        value={creative.cta}
        onChange={(cta) => setCreative({ ...creative, cta })}
      />

      <CreativePreview creative={creative} />
    </div>
  );
};

export default CreativeScreen;
