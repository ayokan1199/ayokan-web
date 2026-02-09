import React, { useState } from "react";

const SubmitCampaign: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);

    setTimeout(() => {
      alert("Campagne soumise avec succès !");
      setSubmitting(false);
    }, 1500);
  };

  return (
    <div className="text-right">
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`px-6 py-2 rounded text-white ${
          submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitting ? "Envoi..." : "Soumettre la campagne"}
      </button>
    </div>
  );
};

export default SubmitCampaign;
