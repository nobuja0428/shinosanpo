import { PolicyLayout } from "@/components/PolicyLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("運営情報", "おさんぽクラブ東京の目的、対象エリア、情報の扱いを説明します。", "/about/");

export default function AboutPage() {
  return (
    <PolicyLayout eyebrow="About" title="運営情報" lead="東京の街を、時間・予算・気分から選びやすくする地域メディアです。">
      <section><h2>目的</h2><p>高円寺・吉祥寺・浅草の散歩を、移動・休憩・トイレ・公式情報まで含めて計画できる状態を目指します。</p></section>
      <section><h2>現在の公開範囲</h2><p>公開中は3エリアです。未公開エリアを完成済みとは表示しません。</p></section>
      <section><h2>編集主体</h2><p>おさんぽクラブ東京編集部が、公開情報を整理して掲載しています。現地取材は未実施です。</p></section>
    </PolicyLayout>
  );
}
