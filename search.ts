import Link from "next/link";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerGrid">
        <div>
          <strong>おさんぽクラブ東京</strong>
          <p>高円寺・吉祥寺・浅草から始める、公開情報ベースの東京散歩ガイドです。</p>
        </div>
        <nav aria-label="サイト情報">
          <Link href="/about/">運営情報</Link>
          <Link href="/editorial-policy/">編集方針</Link>
          <Link href="/privacy/">プライバシー</Link>
          <Link href="/advertise/">広告掲載</Link>
          <Link href="/contact/">問い合わせ</Link>
          <Link href="/events/">イベント</Link>
        </nav>
      </div>
      <p className="footerNote">
        AI生成画像には「イメージ」と表示しています。現地未確認の情報は、公式情報をご確認ください。
      </p>
      <small>© 2026 おさんぽクラブ東京</small>
    </footer>
  );
}
