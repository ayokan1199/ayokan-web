import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // IMPORTANT: si ça arrive, ton écran affichera “Auth indisponible”
  // parce que l’app ne peut pas initialiser Supabase.
  // Mets bien ces variables dans ton .env (à la racine):
  // VITE_SUPABASE_URL=...
  // VITE_SUPABASE_ANON_KEY=...
  console.error("[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const AVATARS_BUCKET = "avatars";

function sanitizeFilename(name: string) {
  return name.replace(/[^\w.\-]+/g, "_");
}

export async function uploadAvatar(userId: string, file: File) {
  if (!userId) throw new Error("uploadAvatar: userId manquant");
  if (!file) throw new Error("uploadAvatar: fichier manquant");

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const safeName = sanitizeFilename(file.name || `avatar.${ext}`);
  const path = `${userId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage.from(AVATARS_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
    contentType: file.type || "image/*",
  });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(path);
  const publicUrl = data?.publicUrl;

  if (!publicUrl) {
    throw new Error("Impossible de récupérer l’URL publique de l’avatar");
  }

  return { path, publicUrl };
}

export function getAvatarPublicUrl(path: string) {
  const { data } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
