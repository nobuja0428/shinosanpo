"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { searchIndex } from "@/lib/search";
import { FAVORITES_KEY, parseFavorites } from "@/lib/favorites";

export function FavoritesPanel() {
  const [ready, setReady] = useState(false);
  const [favorites, setFavorites] = useState(() => [] as ReturnType<typeof parseFavorites>);

  useEffect(() => {
    try {
      setFavorites(parseFavorites(localStorage.getItem(FAVORITES_KEY)));
    } finally {
      setReady(true);
    }
  }, []);

  const remove = (type: string, id: string) => {
    const next = favorites.filter((item) => item.type !== type || item.id !== id);
    setFavorites(next);
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(next)); } catch { /* 利用不可時は画面状態だけ更新 */ }
  };

  if (!ready) return <p>保存内容を読み込んでいます…</p>;
  const resolved = favorites
    .map((favorite) => ({ favorite, content: searchIndex.find((item) => item.type === favorite.type && item.id === favorite.id) }))
    .filter((entry) => entry.content);

  if (!resolved.length) {
    return <div className="emptyState"><h2>保存したページはありません</h2><p>コース・エリア・スポット・読み物の「保存する」から追加できます。</p><Link className="button primary" href="/courses/">散歩コースを見る</Link></div>;
  }

  return (
    <div className="searchResults">
      {resolved.map(({ favorite, content }) => content && (
        <article className="searchResult" key={`${favorite.type}-${favorite.id}`}>
          <span className="eyebrow">{favorite.type}</span>
          <h2><Link href={content.href}>{content.title}</Link></h2>
          <p>{content.summary}</p>
          <button type="button" onClick={() => remove(favorite.type, favorite.id)}>保存を解除</button>
        </article>
      ))}
    </div>
  );
}
