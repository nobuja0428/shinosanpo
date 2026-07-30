import type { ContentType } from "@/content";

export const FAVORITES_KEY = "osanpoClubTokyoFavoritesV1";

export interface Favorite {
  type: ContentType;
  id: string;
}

export const parseFavorites = (raw: string | null): Favorite[] => {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const seen = new Set<string>();
    return parsed.filter((value): value is Favorite => {
      if (!value || typeof value !== "object") return false;
      const candidate = value as Record<string, unknown>;
      if (!["area", "course", "spot", "story"].includes(String(candidate.type))) return false;
      if (typeof candidate.id !== "string" || !candidate.id) return false;
      const key = `${candidate.type}:${candidate.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } catch {
    return [];
  }
};

export const toggleFavorite = (favorites: Favorite[], target: Favorite) => {
  const exists = favorites.some((item) => item.type === target.type && item.id === target.id);
  return exists
    ? favorites.filter((item) => item.type !== target.type || item.id !== target.id)
    : [...favorites, target];
};
