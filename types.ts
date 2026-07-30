import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/MediaImage";
import { SaveShare } from "@/components/SaveShare";
import { TrustPanel } from "@/components/TrustPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { areas, routes, spots } from "@/content";
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
  const route = routes.find((item) => item.areaId === spot.areaId);
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
            <ul className="relatedList">{related.map((item) => <li key={`${item.type}-${item.id}`}><Link href={item.href}>{item.title}</Link></li>)}</ul>
          </section>
        </article>
        <aside className="actionPanel" aria-label="行動パネル">
          <h2>次にすること</h2>
          <a className="button primary" href={googleMapsUrl(spot.mapQuery)} target="_blank" rel="noopener noreferrer">地図を開く</a>
          <a className="button" href={spot.officialUrl} target="_blank" rel="noopener noreferrer">公式情報を確認</a>
          {route && <Link className="button" href={`/routes/${route.slug}/`}>コースで見る</Link>}
          <SaveShare type="spot" id={spot.id} title={spot.name} />
        </aside>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "スポット", path: "/spots/" }, { name: spot.name, path: `/spots/${spot.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Place", name: spot.name, url: absoluteUrl(`/spots/${spot.slug}/`), image: absoluteUrl(spot.image.src), containedInPlace: { "@type": "City", name: area.name } }} />
    </div>
  );
}
