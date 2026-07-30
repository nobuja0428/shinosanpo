import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoritesPanel } from "@/components/FavoritesPanel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("保存した散歩", "このブラウザに保存した散歩情報の一覧です。", "/favorites/", undefined, true);

export default function FavoritesPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "保存" }]} />
      <span className="eyebrow">ログイン不要</span>
      <h1>保存した散歩</h1>
      <p className="lead">保存内容はこのブラウザだけに保持されます。ここからいつでも解除できます。</p>
      <FavoritesPanel />
    </div>
  );
}
