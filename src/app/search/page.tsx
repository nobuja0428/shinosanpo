import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPanel } from "@/components/SearchPanel";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("サイト内検索", "東京の散歩コース、エリア、スポット、読み物を検索できます。", "/search/", undefined, true);

export default function SearchPage() {
  return (
    <div className="page">
      <Breadcrumbs items={[{ label: "検索" }]} />
      <span className="eyebrow">端末内で検索</span>
      <h1>東京の散歩を検索する</h1>
      <p className="lead">検索語を外部サービスへ送信しません。条件はURLに保存でき、戻る・進むにも対応します。</p>
      <Suspense fallback={<p>検索を準備しています…</p>}><SearchPanel /></Suspense>
    </div>
  );
}
