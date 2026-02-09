import React from "react";

interface Props {
  mediaUrl?: string;
  onUpload: (url: string) => void;
}

const CreativeUploader: React.FC<Props> = ({ mediaUrl, onUpload }) => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onUpload(url);
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h2 className="font-semibold">Média (image ou vidéo)</h2>

      <input type="file" accept="image/*,video/*" onChange={handleUpload} />

      {mediaUrl && (
        <div className="mt-2">
          <img
            src={mediaUrl}
            alt="Preview"
            className="max-h-40 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default CreativeUploader;
