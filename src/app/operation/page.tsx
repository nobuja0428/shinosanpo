import { PolicyLayout } from "@/components/PolicyLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "運営体制",
  "おさんぽクラブ東京の更新、訂正、公開判断の運用方針です。",
  "/operation/"
);

export default function OperationPage() {
  return (
    <PolicyLayout
      eyebrow="Operation"
      title="運営体制"
      lead="公開情報の確認状態を明示し、推測や架空情報を掲載しない運用を行います。"
    >
      <section>
        <h2>更新の考え方</h2>
        <p>公式情報を優先し、情報確認日と最終更新日を記録します。確認できない項目は「記録なし」または「更新待ち」と表示します。</p>
      </section>
      <section>
        <h2>訂正と公開判断</h2>
        <p>問い合わせ窓口が未設定の間は送信UIを表示しません。公開用窓口を設定した後、訂正依頼の受付方法を案内します。</p>
      </section>
      <section>
        <h2>外部サービス</h2>
        <p>アクセス解析、問い合わせ、広告掲載は、設定・同意・運用条件が整った機能だけを有効にします。</p>
      </section>
    </PolicyLayout>
  );
}
