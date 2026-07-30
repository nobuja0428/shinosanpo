import { SpotCard } from "@/components/Cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { spots } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("東京の店・スポット", "高円寺・吉祥寺・浅草の商店街、公園、寺社、文化施設を探せます。", "/spots/");

export default function SpotsPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "スポット" }]} />
      <span className="eyebrow">立ち寄る</span>
      <h1>東京の店・スポット</h1>
      <p className="lead">営業日・営業時間・価格は推測せず、必要な場合は公式情報へ案内します。</p>
      <div className="cardGrid">{spots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}</div>
    </div>
  );
}
