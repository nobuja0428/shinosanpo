import Link from "next/link";
import type { Area, Spot, Story, WalkingRoute } from "@/content";
import { contentCountByArea, trustLabel } from "@/lib/content";
import { MediaImage } from "./MediaImage";

export function AreaCard({ area }: { area: Area }) {
  return (
    <article className="card">
      <MediaImage image={area.image} />
      <div className="cardBody">
        <span className="eyebrow">{area.municipality} · {trustLabel(area.trust)}</span>
        <h3><Link href={`/areas/${area.slug}/`}>{area.name}</Link></h3>
        <p>{area.lead}</p>
        <p className="metaLine">{contentCountByArea(area.id)}件公開 · {area.durationLabel} · {area.budgetLabel}</p>
      </div>
    </article>
  );
}

export function RouteCard({ route }: { route: WalkingRoute }) {
  return (
    <article className="card">
      <MediaImage image={route.image} />
      <div className="cardBody">
        <span className="eyebrow">散歩コース</span>
        <h3><Link href={`/routes/${route.slug}/`}>{route.title}</Link></h3>
        <dl className="compactMeta">
          <div><dt>所要</dt><dd>{route.durationMin}分</dd></div>
          <div><dt>距離</dt><dd>約{route.distanceKm}km</dd></div>
          <div><dt>予算</dt><dd>{route.budgetMinYen.toLocaleString()}〜{route.budgetMaxYen.toLocaleString()}円</dd></div>
          <div><dt>対象</dt><dd>{route.audience.join("・")}</dd></div>
        </dl>
        <p>{route.summary}</p>
        <p className="metaLine">{route.start} → {route.goal}</p>
      </div>
    </article>
  );
}

export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="card">
      <MediaImage image={spot.image} />
      <div className="cardBody">
        <span className="eyebrow">{spot.category}</span>
        <h3><Link href={`/spots/${spot.slug}/`}>{spot.name}</Link></h3>
        <p>{spot.summary}</p>
        <div className="tagList">{spot.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="card">
      <MediaImage image={story.image} />
      <div className="cardBody">
        <span className="eyebrow">{story.category} · {story.readTime}</span>
        <h3><Link href={`/stories/${story.slug}/`}>{story.title}</Link></h3>
        <p>{story.summary}</p>
        <p className="metaLine">{story.author} · 更新 {story.trust.updatedAt}</p>
      </div>
    </article>
  );
}
