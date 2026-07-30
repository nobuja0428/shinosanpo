import { PolicyLayout } from "@/components/PolicyLayout";
import { gaEnabled } from "@/lib/analytics";
import { FAVORITES_KEY } from "@/lib/favorites";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("プライバシー", "お気に入り保存、アクセス解析、外部サイトへの移動に関する説明です。", "/privacy/");

export default function PrivacyPage() {
  return (
    <PolicyLayout eyebrow="Privacy" title="プライバシー" lead="必要以上の個人情報を集めない構成です。">
      <section><h2>お気に入り</h2><p>保存機能はブラウザのLocalStorageを使用し、キー名は<code>{FAVORITES_KEY}</code>です。保存ページから個別に解除でき、ブラウザのサイトデータ削除でも消去できます。</p></section>
      <section><h2>アクセス解析</h2><p>{gaEnabled ? "有効なGA4測定IDが設定されているため、ページ表示と匿名化した操作イベントを送信します。" : "現在、GA4は無効です。Google Analyticsのスクリプトは読み込みません。"}</p><p>生の検索語、氏名、メール、電話、住所、問い合わせ本文、LocalStorage内容、外部URL全文は送信しません。</p></section>
      <section><h2>外部サイト</h2><p>Googleマップや公式サイトへ移動した後は、各サービスのプライバシー方針が適用されます。位置情報の利用は要求しません。</p></section>
    </PolicyLayout>
  );
}
