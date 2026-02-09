import React from "react";

const VoiceNotes: React.FC = () => {
  const recordNote = () => {
    alert("Enregistrement de note vocale (simulé)...");
  };

  return (
    <button
      onClick={recordNote}
      className="px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
    >
      🎤 Note vocale
    </button>
  );
};

export default VoiceNotes;
