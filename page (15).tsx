import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RouteCard, SpotCard, StoryCard } from "@/components/Cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/MediaImage";
import { TrustPanel } from "@/components/TrustPanel";
import { SaveShare } from "@/components/SaveShare";
import { SummaryPanel } from "@/components/SummaryPanel";
import { areas, routes, spots, stories } from "@/content";
import { absoluteUrl, googleMapsUrl } from "@/config/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const generateStaticParams = () => areas.map((area) => ({ slug: area.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  return area ? pageMetadata(`${area.name}の散歩ガイド`, area.description, `/areas/${area.slug}/`, area.image) : {};
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areas.find((item) => item.slug === slug);
  if (!area) notFound();
  const areaRoutes = routes.filter((item) => item.areaId === area.id);
  const areaSpots = spots.filter((item) => item.areaId === area.id);
  const areaStories = stories.filter((item) => item.areaId === area.id);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "エリア", href: "/areas/" }, { label: area.name }]} />
      <div className="detailLayout">
        <article className="detailMain">
          <span className="eyebrow">{area.municipality} · 基本ガイド</span>
          <h1>{area.name}の散歩ガイド</h1>
          <SummaryPanel
            conclusion={`${area.lead} ${area.durationLabel}、予算${area.budgetLabel}が目安です。`}
            why="駅・所要・予算と、コース・スポット・読み物を一画面で確認できます。"
            before="現地未確認です。当日は公式情報と現地案内を確認してください。"
          />
          <dl className="compactMeta">
            <div><dt>駅</dt><dd>{area.stations.join("・")}</dd></div>
            <div><dt>所要</dt><dd>{area.durationLabel}</dd></div>
            <div><dt>予算</dt><dd>{area.budgetLabel}</dd></div>
            <div><dt>現地取材</dt><dd>未実施</dd></div>
          </dl>
          <MediaImage image={area.image} eager />
          <TrustPanel trust={area.trust} />
          <section>
            <h2>{area.name}でできること</h2>
            <p>{area.description}</p>
            <div className="tagList">{area.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>
          <section>
            <h2>散歩コース</h2>
            <div className="cardGrid">{areaRoutes.map((route) => <RouteCard key={route.id} route={route} />)}</div>
          </section>
          <section>
            <h2>立ち寄りスポット</h2>
            <div className="cardGrid">{areaSpots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}</div>
          </section>
          <section>
            <h2>街の読み物</h2>
            <div className="cardGrid">{areaStories.map((story) => <StoryCard key={story.id} story={story} />)}</div>
          </section>
          <section>
            <h2>更新履歴</h2>
            <p>{area.trust.updatedAt}：公開情報の参照先と掲載内容を整理しました。</p>
          </section>
        </article>
        <aside className="actionPanel" aria-label="次の行動">
          <h2>次にすること</h2>
          <a className="button primary" href={googleMapsUrl(area.mapQuery)} target="_blank" rel="noopener noreferrer">Googleマップを開く</a>
          <SaveShare type="area" id={area.id} title={`${area.name}の散歩ガイド`} />
        </aside>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "エリア", path: "/areas/" }, { name: area.name, path: `/areas/${area.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: `${area.name}の散歩ガイド`, url: absoluteUrl(`/areas/${area.slug}/`), description: area.description, inLanguage: "ja" }} />
    </div>
  );
}
