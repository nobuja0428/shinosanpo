"use client";

import { useMemo, useState } from "react";
import type { Area, AreaId, Spot } from "@/content";
import { googleMapsUrl } from "@/config/site";
import { track } from "@/lib/analytics";

export function MapExplorer({ areas, spots }: { areas: Area[]; spots: Spot[] }) {
  const [area, setArea] = useState<AreaId | "">("");
  const [activeSpot, setActiveSpot] = useState("");
  const filtered = useMemo(() => (area ? spots.filter((spot) => spot.areaId === area) : spots), [area, spots]);

  const activate = (spotId: string, scroll = false) => {
    setActiveSpot(spotId);
    if (scroll) document.getElementById(`spot-card-${spotId}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    track("map_interaction", { action: scroll ? "pin_select" : "card_focus", area, spot_id: spotId });
  };

  return (
    <>
      <div className="filterPanel">
        <div className="chipRow" aria-label="エリアを選択">
          <button type="button" aria-pressed={!area} onClick={() => setArea("")}>すべて</button>
          {areas.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={area === item.id}
              onClick={() => {
                setArea(item.id);
                track("map_interaction", { action: "area_select", area: item.id, spot_id: "" });
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p aria-live="polite">{filtered.length}件を表示中</p>
      </div>
      <div className="mapExplorerLayout">
        <section className="mapDiagram" aria-label={`位置関係の目安・${filtered.length}件`}>
          {filtered.map((spot, index) => (
            <button
              className={activeSpot === spot.id ? "mapPin isActive" : "mapPin"}
              key={spot.id}
              type="button"
              aria-pressed={activeSpot === spot.id}
              onClick={() => activate(spot.id, true)}
            >
              <span>{index + 1}</span>{spot.name}
            </button>
          ))}
        </section>
        <div className="mapSpotList" aria-label={`スポット一覧・${filtered.length}件`}>
          {filtered.map((spot) => (
            <article
              id={`spot-card-${spot.id}`}
              className={activeSpot === spot.id ? "searchResult isActive" : "searchResult"}
              key={spot.id}
              tabIndex={0}
              onPointerEnter={() => activate(spot.id)}
              onFocus={() => activate(spot.id)}
            >
              <span className="eyebrow">{areas.find((item) => item.id === spot.areaId)?.name} · {spot.category}</span>
              <h2>{spot.name}</h2>
              <p>{spot.summary}</p>
              <a
                href={googleMapsUrl(spot.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("external_map_open", { spot_id: spot.id })}
              >
                Googleマップで確認<span className="srOnly">（外部サイト）</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
