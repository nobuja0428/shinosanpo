import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ActionPanel } from "@/components/ActionPanel";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/MediaImage";
import { TrustPanel } from "@/components/TrustPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { TrackedLink } from "@/components/TrackedLink";
import { areas, courses } from "@/content";
import { absoluteUrl, googleMapsUrl } from "@/config/site";
import { relatedForArea } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const generateStaticParams = () => courses.map((route) => ({ slug: route.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = courses.find((item) => item.slug === slug);
  return route ? pageMetadata(route.title, route.summary, `/courses/${route.slug}/`, route.image) : {};
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = courses.find((item) => item.slug === slug);
  if (!route) notFound();
  const area = areas.find((item) => item.id === route.areaId)!;
  const related = relatedForArea(route.areaId, route.id);

  const practicalSections = [
    { title: "1. 電車・駅情報", items: route.transit },
    { title: "2. 食事・カフェ・休憩", items: route.foodBreaks },
    { title: "3. トイレ情報", items: route.toilets }
  ];

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "散歩コース", href: "/courses/" }, { label: route.title }]} />
      <div className="detailLayout">
        <article className="detailMain">
          <span className="eyebrow">{area.name} · 散歩コース</span>
          <h1>{route.title}</h1>
          <SummaryPanel
            conclusion={route.summary}
            why="所要・距離・予算に加え、休憩・トイレ・途中離脱を確認できます。"
            before="営業・利用状況は当日に公式情報と現地で確認してください。"
          />
          <dl className="compactMeta">
            <div><dt>所要</dt><dd>{route.durationMin}分</dd></div>
            <div><dt>距離</dt><dd>約{route.distanceKm}km</dd></div>
            <div><dt>予算</dt><dd>{route.budgetMinYen.toLocaleString()}〜{route.budgetMaxYen.toLocaleString()}円</dd></div>
            <div><dt>対象</dt><dd>{route.audience.join("・")}</dd></div>
            <div><dt>開始</dt><dd>{route.start}</dd></div>
            <div><dt>終了</dt><dd>{route.goal}</dd></div>
            <div><dt>途中離脱</dt><dd>{route.escapeStations.join("・")}</dd></div>
          </dl>
          <MediaImage image={route.image} eager />
          <TrustPanel trust={route.trust} />
          <section>
            <h2>立ち寄り順</h2>
            <ol className="routeSteps">
              {route.stops.map((stop) => (
                <li key={stop.order}>
                  <div><strong>{stop.name}</strong><br /><a href={googleMapsUrl(stop.mapQuery)} target="_blank" rel="noopener noreferrer">地図で確認<span className="srOnly">（外部サイト）</span></a></div>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2>歩く前の実用情報</h2>
            <p>表示順は、移動 → 食事・休憩 → トイレです。営業・利用状況は当日に公式情報と現地で確認してください。</p>
            <div className="practicalGrid">
              {practicalSections.map((section) => (
                <section className="practicalBox" key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <strong>{item.name}</strong>
                        <p>{item.note}</p>
                        {item.status === "verification_pending" && <span className="eyebrow">更新待ち</span>}
                        <a href={item.officialUrl} target="_blank" rel="noopener noreferrer">公式情報<span className="srOnly">（外部サイト）</span></a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
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
          type="course"
          id={route.id}
          title={route.title}
          links={[
            {
              href: googleMapsUrl(`${route.start} ${route.goal}`),
              label: "地図を開く",
              external: true,
              primary: true,
              eventName: "external_map_open"
            },
            { href: `/areas/${area.slug}/`, label: `${area.name}のガイド` }
          ]}
        />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "散歩コース", path: "/courses/" }, { name: route.title, path: `/courses/${route.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: route.title, url: absoluteUrl(`/courses/${route.slug}/`), description: route.summary, inLanguage: "ja" }} />
    </div>
  );
}
