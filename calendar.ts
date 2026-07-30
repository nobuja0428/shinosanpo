import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/MediaImage";
import { SaveShare } from "@/components/SaveShare";
import { TrustPanel } from "@/components/TrustPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { areas, stories } from "@/content";
import { absoluteUrl } from "@/config/site";
import { relatedForArea } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const generateStaticParams = () => stories.map((story) => ({ slug: story.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  return story ? pageMetadata(story.title, story.summary, `/stories/${story.slug}/`, story.image) : {};
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) notFound();
  const area = areas.find((item) => item.id === story.areaId)!;
  const related = relatedForArea(story.areaId, story.id);

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "読み物", href: "/stories/" }, { label: story.title }]} />
      <div className="detailLayout">
        <article className="detailMain">
          <span className="eyebrow">{area.name} · {story.category} · {story.readTime}</span>
          <h1>{story.title}</h1>
          <SummaryPanel
            conclusion={story.summary}
            why="街の見どころを順序立てて把握し、歩く範囲を決めやすくします。"
            before="現地取材は未実施です。公式情報と現地案内を優先してください。"
          />
          <MediaImage image={story.image} eager />
          <TrustPanel trust={story.trust} />
          <p className="lead">{story.intro}</p>
          {story.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          <section>
            <h2>関連する次のページ</h2>
            <ul className="relatedList">{related.map((item) => <li key={`${item.type}-${item.id}`}><Link href={item.href}>{item.title}</Link></li>)}</ul>
          </section>
        </article>
        <aside className="actionPanel" aria-label="行動パネル">
          <h2>次にすること</h2>
          <Link className="button primary" href={`/areas/${area.slug}/`}>{area.name}のガイド</Link>
          <Link className="button" href="/map/">近くを地図で見る</Link>
          <SaveShare type="story" id={story.id} title={story.title} />
        </aside>
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "読み物", path: "/stories/" }, { name: story.title, path: `/stories/${story.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: story.title, description: story.summary, dateModified: story.trust.updatedAt, author: { "@type": "Organization", name: story.author }, image: absoluteUrl(story.image.src), mainEntityOfPage: absoluteUrl(`/stories/${story.slug}/`), inLanguage: "ja" }} />
    </div>
  );
}
