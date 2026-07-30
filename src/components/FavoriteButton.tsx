"use client";

import { useEffect, useState } from "react";
import type { ContentType } from "@/content";
import { track } from "@/lib/analytics";
import { FAVORITES_KEY, parseFavorites, toggleFavorite } from "@/lib/favorites";

export function FavoriteButton({
  type,
  id
}: {
  type: ContentType;
  id: string;
}) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setSaved(parseFavorites(localStorage.getItem(FAVORITES_KEY)).some((item) => item.type === type && item.id === id));
      } catch {
        setSaved(false);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id, type]);

  const onSave = () => {
    try {
      const next = toggleFavorite(parseFavorites(localStorage.getItem(FAVORITES_KEY)), { type, id });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      const isSaved = next.some((item) => item.type === type && item.id === id);
      setSaved(isSaved);
      setMessage(isSaved ? "保存しました" : "保存を解除しました");
      track("save_click", {
        content_type: type,
        content_id: id,
        action: isSaved ? "add" : "remove"
      });
    } catch {
      setMessage("この環境では保存できません");
    }
  };

  return (
    <>
      <button type="button" aria-pressed={saved} onClick={onSave}>
        {saved ? "★ 保存済み" : "☆ 保存する"}
      </button>
      <span className="srOnly" aria-live="polite">{message}</span>
    </>
  );
}
