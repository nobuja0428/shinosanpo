import { PolicyLayout } from "@/components/PolicyLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("編集方針", "情報確認、訂正、AI利用、イベント状態、広告表示に関する方針です。", "/editorial-policy/");

export default function EditorialPolicyPage() {
  return (
    <PolicyLayout eyebrow="Editorial policy" title="編集方針" lead="確認できた事実、編集上の整理、未確認事項を分けて表示します。">
      <section><h2>情報確認</h2><p>公式サイトや公的機関の公開情報を優先し、最終更新日・情報確認日・現地取材の有無を表示します。確認日がない場合は「記録なし」と明記します。</p></section>
      <section><h2>訂正・更新</h2><p>終了イベント、リンク切れ、営業情報の変化を確認した場合は、通常情報と区別して修正します。推測で補完しません。</p></section>
      <section><h2>AI利用</h2><p>構成や表現の補助にAIを利用しています。AI生成画像は「イメージ」と表示し、実在店舗の外観や現地写真として扱いません。</p></section>
      <section><h2>広告・PR</h2><p>将来掲載する場合は「PR」表示とスポンサー名を必須とし、編集記事と分離します。</p></section>
    </PolicyLayout>
  );
}
