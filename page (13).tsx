import { PolicyLayout } from "@/components/PolicyLayout";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("広告掲載", "おさんぽクラブ東京の広告・地域パートナーに関する準備状況と掲載方針です。", "/advertise/");

export default function AdvertisePage() {
  return (
    <PolicyLayout eyebrow="Advertising" title="広告掲載" lead="現在は正式受付前です。架空の実績・料金・広告主は掲載しません。">
      <section><h2>現在の状態</h2><ul><li>地域パートナー：募集予定</li><li>媒体資料：準備中</li><li>掲載実績：蓄積中</li><li>正式プラン：準備中</li></ul></section>
      <section><h2>掲載方針</h2><p>編集記事と広告を分離し、PRラベルとスポンサー名を明示します。広告主の主張を編集部の確認済み事実として表示しません。</p></section>
      <section><h2>受付</h2><p>問い合わせ先が未設定のため、申込フォームや送信ボタンは表示していません。</p></section>
    </PolicyLayout>
  );
}
