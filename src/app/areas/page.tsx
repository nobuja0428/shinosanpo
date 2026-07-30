import { AreaCard } from "@/components/Cards";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { areas } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("東京の街から散歩を探す", "高円寺・吉祥寺・浅草の公開中エリアを比較できます。", "/areas/");

export default function AreasPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "エリア" }]} />
      <span className="eyebrow">3エリア公開中</span>
      <h1>東京の街から散歩を探す</h1>
      <p className="lead">公開情報と現地確認状況を明示した、高円寺・吉祥寺・浅草の基本ガイドです。</p>
      <div className="cardGrid">{areas.map((area) => <AreaCard key={area.id} area={area} />)}</div>
    </div>
  );
}
