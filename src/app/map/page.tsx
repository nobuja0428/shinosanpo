import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapExplorer } from "@/components/MapExplorer";
import { areas, spots } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("東京散歩の地図", "高円寺・吉祥寺・浅草の掲載スポットをエリア別に確認し、外部地図で開けます。", "/map/");

export default function MapPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "地図" }]} />
      <span className="eyebrow">APIキー不要</span>
      <h1>東京散歩の地図</h1>
      <p className="lead">正確な座標を推測せず、カードとエリア単位の概略表示を使います。外部リンクはGoogleマップを開きます。</p>
      <MapExplorer areas={areas} spots={spots} />
    </div>
  );
}
