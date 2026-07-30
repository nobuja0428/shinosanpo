import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "ページが見つかりません", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div className="page policy">
      <span className="eyebrow">404</span>
      <h1>ページが見つかりません</h1>
      <p className="lead">URLが変わったか、ページが公開されていない可能性があります。</p>
      <div className="heroActions">
        <Link className="button primary" href="/">ホームへ戻る</Link>
        <Link className="button" href="/search/">サイト内を検索する</Link>
        <Link className="button" href="/areas/">エリアを見る</Link>
      </div>
    </div>
  );
}
