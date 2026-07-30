import { StoryCard } from "@/components/Cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { stories } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("東京の街を知る読み物", "高円寺・吉祥寺・浅草の歩き方を、公開情報と編集部の整理に分けて紹介します。", "/stories/");

export default function StoriesPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "読み物" }]} />
      <span className="eyebrow">知る</span>
      <h1>東京の街を知る読み物</h1>
      <p className="lead">現地未確認の内容を体験談として書かず、公開情報をもとにした歩き方を整理しています。</p>
      <div className="cardGrid">{stories.map((story) => <StoryCard key={story.id} story={story} />)}</div>
    </div>
  );
}
