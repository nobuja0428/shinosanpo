import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ActionPanel } from "@/components/ActionPanel";
import { JsonLd } from "@/components/JsonLd";
import { MediaImage } from "@/components/MediaImage";
import { TrustPanel } from "@/components/TrustPanel";
import { SummaryPanel } from "@/components/SummaryPanel";
import { TrackedLink } from "@/components/TrackedLink";
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
          type="story"
          id={story.id}
          title={story.title}
          links={[
            { href: `/areas/${area.slug}/`, label: `${area.name}のガイド`, primary: true },
            { href: "/map/", label: "近くを地図で見る" }
          ]}
        />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "読み物", path: "/stories/" }, { name: story.title, path: `/stories/${story.slug}/` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: story.title, description: story.summary, dateModified: story.trust.updatedAt, author: { "@type": "Organization", name: story.author }, image: absoluteUrl(story.image.src), mainEntityOfPage: absoluteUrl(`/stories/${story.slug}/`), inLanguage: "ja" }} />
    </div>
  );
}
