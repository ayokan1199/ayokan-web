// src/services/storage.service.ts
import { supabase } from "../lib/supabase.client";

const BUCKET = "avatars";

export type UploadAvatarResult = {
  path: string;
  publicUrl: string;
};

function getFileExt(file: File) {
  const parts = file.name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
}

function safeName(input: string) {
  return input.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export async function uploadAvatar(params: {
  userId: string;
  file: File;
}): Promise<UploadAvatarResult> {
  const { userId, file } = params;

  const ext = getFileExt(file);
  const filename = `${Date.now()}_${safeName(file.name)}`;
  const path = `${userId}/${filename}`;

  // Upload (upsert true pour remplacer si même nom)
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || `image/${ext}`,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  if (!data?.publicUrl) {
    throw new Error("Impossible de récupérer l’URL publique de l’avatar.");
  }

  return { path, publicUrl: data.publicUrl };
}

export async function deleteAvatar(params: { path: string }) {
  const { path } = params;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
