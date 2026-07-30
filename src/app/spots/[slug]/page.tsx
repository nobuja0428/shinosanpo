import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ActionPanel } from "@/components/ActionPanel";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/MediaImage";
import { TrustPanel } from "@/components/TrustPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { TrackedLink } from "@/components/TrackedLink";
import { areas, courses, spots } from "@/content";
import { absoluteUrl, googleMapsUrl } from "@/config/site";
import { relatedForArea } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const generateStaticParams = () => spots.map((spot) => ({ slug: spot.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const spot = spots.find((item) => item.slug === slug);
  return spot ? pageMetadata(`${spot.name}｜${spot.category}`, spot.summary, `/spots/${spot.slug}/`, spot.image) : {};
}

export default async function SpotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const spot = spots.find((item) => item.slug === slug);
  if (!spot) notFound();
  const area = areas.find((item) => item.id === spot.areaId)!;
  const route = courses.find((item) => item.areaId === spot.areaId);
  const related = relatedForArea(spot.areaId, spot.id);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "スポット", href: "/spots/" }, { label: spot.name }]} />
      <div className="detailLayout">
        <article className="detailMain">
          <span className="eyebrow">{area.name} · {spot.category}</span>
          <h1>{spot.name}</h1>
          <SummaryPanel
            conclusion={spot.summary}
            why="散歩コースへ組み込む前に、特徴と公式確認先を把握できます。"
            before="営業時間・価格・休業日は、公式情報で当日に確認してください。"
          />
          <MediaImage image={spot.image} eager />
          <TrustPanel trust={spot.trust} />
          <section>
            <h2>立ち寄る前に</h2>
            <p>営業時間・価格・休業日は変わる場合があります。このページでは推測せず、公式情報へのリンクを案内します。</p>
            <div className="tagList">{spot.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>
          <section>
            <h2>関連する次のページ</h2>
            <ul className="relatedList">
              {related.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <TrackedLink
                    href={item.href}
                    eventName="related_click"
                    eventData={{ content_type: item.type, content_id: item.id }}
                  >
                    {item.title}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <ActionPanel
          type="spot"
          id={spot.id}
          title={spot.name}
          links={[
            {
              href: googleMapsUrl(spot.mapQuery),
              label: "地図を開く",
              external: true,
              primary: true,
              eventName: "external_map_open"
            },
            {
              href: spot.officialUrl,
              label: "公式情報を確認",
              external: true,
              eventName: "source_open"
            },
            ...(route ? [{ href: `/courses/${route.slug}/`, label: "コースで見る" }] : [])
          ]}
        />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "スポット", path: "/spots/" }, { name: spot.name, path: `/spots/${spot.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Place", name: spot.name, url: absoluteUrl(`/spots/${spot.slug}/`), image: absoluteUrl(spot.image.src), containedInPlace: { "@type": "City", name: area.name } }} />
    </div>
  );
}
